import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import { Button } from "./button";
import { LucideSatellite, LucideTvMinimalPlay } from "lucide-react";

// TypeScript interfaces - exported for external use
export interface SeatConfig {
  totalSeats: number;
  vipSeats: number;
  generalSeats: number;
  vipPrice: number;
  generalPrice: number;
}

export interface Seat {
  id?: string;
  row: string;
  number: number;
  type: "vip" | "general";
  status: string | "available" | "selected" | "occupied";
  price: number;
}

// export interface SeatBookingProps {
//   config: SeatConfig;
//   onSelectionChange?: (selectedSeats: Seat[], totalPrice: number) => void;
// }

const SeatBooking = () => {
  const config = {
    vip: 30,
    general: 90,
    vipPrice: 150,
    generalPrice: 90,
  };

  function generateSeats() {
    const totalSeats = config.vip + config.general;
    for (let i = 0; i < totalSeats; i++) {
      const seat: Seat = {
        id: String(i),
        number: i + 1,
        price: config.vip > i + 1 ? config.vipPrice : config.generalPrice,
        status: "available",
        row: config.vip > i + 1 ? "VIP" : "A",
        type: config.vip > i + 1 ? "vip" : "general",
      };

      setSeats((prevSeats) => [...prevSeats, seat]);
    }
  }
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const totalPrice = selectedSeats.reduce((acc: number, seat: Seat) => {
    return acc + seat.price;
  }, 0);

  useEffect(() => {
    generateSeats();
  }, []);
  return (
    <div className="p-4 w-1/2 m-auto">
      {seats.map((seat, index) => {
        return (
          <Seat
            key={index}
            seat={seat}
            seats={seats}
            setSelectedSeats={setSelectedSeats}
            setSeats={setSeats}
          />
        );
      })}

      <div className="bg-zinc-300 rounded-2xl shadow p-8 mt-8">
        <h1>${totalPrice.toPrecision()}</h1>
        <h1>Ticket Number {selectedSeats.length}</h1>
        {JSON.stringify(selectedSeats)}
      </div>
    </div>
  );
};

export default SeatBooking;

function Seat({
  seat,
  setSeats,
  setSelectedSeats,
}: {
  seats: Seat[];
  setSeats: Dispatch<SetStateAction<Seat[]>>;
  setSelectedSeats: Dispatch<SetStateAction<Seat[]>>;
  seat?: Seat;
}) {
  function addSeat() {
    if (!seat) return;
    console.log(seat);

    const newSeat: Seat = {
      ...seat,
      status: "selected",
      row: seat.row,
      number: seat.number,
      type: seat.type,
      price: seat.price,
      id: seat.id,
    };
    switch (seat.status) {
      case "available":
        setSelectedSeats((prev: Seat[]) => [...prev, newSeat]);

        setSeats((prev: Seat[]) => {
          const filter = prev.filter((seat) => seat.id !== newSeat.id);
          return [...filter, newSeat];
        });
        break;
      case "selected":
        setSelectedSeats((prev: Seat[]) =>
          prev.filter((s) => s.id === seat.id)
        );

        setSeats((prev: Seat[]) => [
          ...prev,
          {
            status: "available",
            row: seat.row,
            number: seat.number,
            type: seat.type,
            price: seat.price,
            id: seat.id,
          },
        ]);
        break;
      case "occupied":
        break;
      default:
        break;
    }
  }
  return (
    <Button
      onClick={addSeat}
      className={` cursor-pointer hover:opacity-80 ${
        seat?.status === "available"
          ? "bg-green-200 border-green-500"
          : seat?.status === "selected"
          ? "bg-blue-300 border-blue-500"
          : seat?.status === "occupied"
          ? "bg-red-200 border-red-500"
          : ""
      } p-2 w-8 h-8 rounded-sm border  `}
    >
      {seat?.type === "vip" ? (
        <LucideTvMinimalPlay color="#000" size={10} />
      ) : (
        <LucideSatellite color="#000" size={10} />
      )}
    </Button>
  );
}
