/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";
import type { PaymentFormData } from "@/components/ui/PaymentForm";
import { env } from "configs/env";
import { useAuth } from "./AuthProvider";
import { useEvents } from "./EventsProvider";

const BASE_URL = env.BASE_URL;

export interface BookingContextType {
  selectedSeats: string[];
  setSelectedSeats: Dispatch<SetStateAction<string[]>>;
  ticketPrice: number;
  ticketState: "buy" | "reserve";
  setTicketState: Dispatch<SetStateAction<"buy" | "reserve">>;
  totalTicketsPrice: number;
  handleTickets: (paymentInfo: PaymentFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const BookingContext = createContext<BookingContextType>({
  selectedSeats: [],
  setSelectedSeats: () => {},
  ticketPrice: 0,
  ticketState: "buy",
  setTicketState: () => {},
  totalTicketsPrice: 0,
  handleTickets: () => Promise.resolve(),
  loading: false,
  error: null,
});

const BookingTicketsProvider = ({ children }: { children: ReactNode }) => {
  const { eventDetails } = useEvents();
  const { user, token } = useAuth();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const ticketPrice = eventDetails ? eventDetails.ticketTypes.price : 25;
  const [ticketState, setTicketState] = useState<"reserve" | "buy">("buy");
  const totalTicketsPrice = useMemo(
    () => selectedSeats.length * ticketPrice,
    [selectedSeats, ticketPrice]
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTickets = async (paymentInfo: PaymentFormData) => {
    try {
      setLoading(true);
      setError(null);
      const { paymentMethod } = paymentInfo;

      const updatedSeatsMap = (eventDetails?.seatsMap as number[][] ?? []).map(
        (row, ri) =>
          row.map((status, ci) => {
            const name = `${String.fromCharCode(65 + ri)}-${ci + 1}`;
            if (selectedSeats.includes(name)) return paymentMethod === "reserved" ? 1 : 2;
            return status;
          })
      );

      const formData = {
        event: eventDetails?._id,
        user: user?._id,
        ticketType: "general",
        seatsNumber: selectedSeats,
        price: ticketPrice,
        quantity: selectedSeats.length,
        seats: updatedSeatsMap,
        paymentDetails: {
          paymentMethod,
          paymentStatus: "completed",
        },
      };
      const response = await fetch(`${BASE_URL}/tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("connection error can't reserve your tickets!!");
      }
      const data = await response.json();
      return data.data;
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BookingContext.Provider
      value={{
        selectedSeats,
        setSelectedSeats,
        ticketPrice,
        ticketState,
        setTicketState,
        totalTicketsPrice,
        handleTickets,
        loading,
        error,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingTickets = () => useContext(BookingContext);

export default BookingTicketsProvider;
