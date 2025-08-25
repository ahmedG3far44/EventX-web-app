/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";

export interface BookingContextType {
  seats: SeatType[][];
  setSeats: Dispatch<SetStateAction<SeatType[][]>>;
  selectedSeats: string[];
  setSelectedSeats: Dispatch<SetStateAction<string[]>>;
  initialSeats: () => void;
  handleSeatClick: (rowIndex: number, seatIndex: number) => void;
  getSeatClassName: (
    seat: SeatType,
    rowIndex: number,
    seatIndex: number
  ) => string;
  getSelectedSeatCount: () => number;
  handleBooking: () => void;
  getTotalPrice: () => number;
  loading: boolean;
  error: string | null;
}
export interface SeatType {
  id?: number;
  row?: number;
  number?: number;
  status: SeatStatusType;
}

export type SeatStatusType = "available" | "selected" | "paid" | "reserved";
export const BookingContext = createContext<BookingContextType>({
  seats: [],
  setSeats: () => {},
  selectedSeats: [],
  setSelectedSeats: () => {},
  initialSeats: () => {},
  handleSeatClick: () => {},
  getSeatClassName: () => "",
  getTotalPrice: () => 0,
  getSelectedSeatCount: () => 0,
  handleBooking: () => {},
  loading: false,
  error: null,
});

const BookingTicketsProvider = ({ children }: { children: ReactNode }) => {
  const initialSeats = () => {
    const seats = [];
    const rows = 5;
    const seatsPerRow = [6, 8, 10, 10, 10];
    let seatId = 1;
    for (let row = 0; row < rows; row++) {
      const rowSeats = [];
      for (let seat = 0; seat < seatsPerRow[row]; seat++) {
        rowSeats.push({
          id: seatId++,
          row: row + 1,
          number: seat + 1,
          status: "available",
        });
      }
      seats.push(rowSeats);
    }
    return seats;
  };
  const [seats, setSeats] = useState(initialSeats() as SeatType[][]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

  //   [
  //     "0-0",
  //     "0-1",
  //     "0-4",
  //     "1-0",
  //   ]
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getSeatClassName = (
    seat: SeatType,
    rowIndex: number,
    seatIndex: number
  ) => {
    const baseClasses =
      "w-8 h-8 rounded-md cursor-pointer transition-all duration-200 hover:scale-105 border-2";
    const seatKey = `${rowIndex}-${seatIndex}`;
    const isSelected = selectedSeats.includes(seatKey);

    if (seat.status === "paid") {
      return `${baseClasses} bg-purple-600 border-purple-700 cursor-not-allowed`;
    }
    if (seat.status === "reserved") {
      return `${baseClasses} bg-purple-400 border-purple-500 cursor-not-allowed`;
    }
    if (isSelected) {
      return `${baseClasses} bg-green-500 border-green-600 shadow-lg`;
    }
    return `${baseClasses} bg-gray-300 border-gray-400 hover:bg-gray-200`;
  };

  const getTotalPrice = () => {
    return getSelectedSeatCount() * 25;
  };

  const getSelectedSeatCount = () => selectedSeats.length;

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;
    alert(`Booking ${selectedSeats.length} seat(s) for $${getTotalPrice()}`);

    // Update seat status to reserved after booking
    const newSeats = seats.map((row, rowIndex) =>
      row.map((seat: SeatType, seatIndex: number) => {
        const seatKey = `${rowIndex}-${seatIndex}`;
        if (selectedSeats.includes(seatKey)) {
          return { ...seat, status: "reserved" as SeatStatusType };
        }
        return seat;
      })
    );

    setSeats(newSeats);
    setSelectedSeats([]);
  };
  const handleSeatClick = (rowIndex: number, seatIndex: number) => {
    const seat = seats[rowIndex][seatIndex];

    if (seat.status === "paid" || seat.status === "reserved") return;

    const seatKey = `${rowIndex}-${seatIndex}`;
    const isSelected = selectedSeats.includes(seatKey);

    if (isSelected) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatKey));
    } else {
      setSelectedSeats([...selectedSeats, seatKey]);
    }

    console.log(selectedSeats);
  };
  console.log(setError, setLoading);
  return (
    <BookingContext.Provider
      value={{
        seats,
        setSeats,
        selectedSeats,
        setSelectedSeats,
        handleSeatClick,
        getTotalPrice,
        getSeatClassName,
        getSelectedSeatCount,
        handleBooking,
        initialSeats,
        error,
        loading,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBookingTickets = () => useContext(BookingContext);

export default BookingTicketsProvider;
