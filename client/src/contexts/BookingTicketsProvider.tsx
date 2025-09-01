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
  const [seats, setNewSeatsMap] = useState<number[][]>([
    [0, 2, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 2, 0, 1, 0, 0],
    [0, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
  ]);
  const [ticketState, setTicketState] = useState<"reserve" | "buy">("buy");
  const [totalTicketsPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTickets = async (paymentInfo: PaymentFormData) => {
    try {
      setLoading(true);
      setError(null);
      const { cardName, cardNumber, cvc, expiryDate, paymentMethod } =
        paymentInfo;
      const formData = {
        event: eventDetails._id,
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
      console.log("handle buy or reserve tickets");
      console.log(formData);
      console.log(token);
      console.log(data);
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

//    {
//     ticketId:"",
//     eventId: "",
//     user: "",
//     ticketType:"general",
//     seatNumber: ["A-1", "B-3", "C-2"],
//     price:240,
//     quantity: 3,
//     status: "paid",
//     qrCode: "base_url/tickets/ticketId",
//     paymentDetails: {
//       paymentId:"id",
//       paymentMethod:"card",
//       cardName:"Ahmed G3far",
//       cardNumber: 4848 4848 4848 4848
//       expiryDate: 08/29,
//       cvc: 343,
//       paymentStatus:"completed",
//     },
//     bookingDate: 31/8/2025,
//   }
