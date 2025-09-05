/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";
import { useEvents } from "./EventsProvider";
import type { PaymentFormData } from "@/components/ui/PaymentForm";
import { useAuth } from "./AuthProvider";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

export interface BookingContextType {
  selectedSeats: string[];
  setSelectedSeats: Dispatch<SetStateAction<string[]>>;
  ticketPrice: number;
  seats: number[][];
  setNewSeatsMap: Dispatch<SetStateAction<number[][]>>;
  ticketState: "buy" | "reserve";
  setTicketState: Dispatch<SetStateAction<"buy" | "reserve">>;
  totalTicketsPrice: number;
  setTotalPrice: Dispatch<SetStateAction<number>>;
  handleTickets: (paymentInfo: PaymentFormData) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export const BookingContext = createContext<BookingContextType>({
  selectedSeats: [],
  setSelectedSeats: () => {},
  ticketPrice: 0,
  seats: [],
  setNewSeatsMap: () => {},
  ticketState: "buy",
  setTicketState: () => {},
  totalTicketsPrice: 0,
  setTotalPrice: () => {},
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
  const [totalTicketsPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seats, setNewSeatsMap] = useState<number[][]>(
    eventDetails?.seatsMap as number[][]
  );

  const handleTickets = async (paymentInfo: PaymentFormData) => {
    try {
      setLoading(true);
      setError(null);
      const { cardName, cardNumber, cvc, expiryDate, paymentMethod } =
        paymentInfo;
      const formData = {
        event: eventDetails?._id,
        user: user?._id,
        ticketType: "general",
        seatsNumber: selectedSeats,
        price: totalTicketsPrice,
        quantity: selectedSeats.length,
        seats,
        paymentDetails: {
          paymentMethod,
          cardName,
          cardNumber,
          expiryDate,
          cvc,
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
      setSelectedSeats([])
      setTotalPrice(0);
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
        seats,
        selectedSeats,
        setSelectedSeats,
        ticketPrice,
        setNewSeatsMap,
        ticketState,
        setTicketState,
        totalTicketsPrice,
        setTotalPrice,
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
