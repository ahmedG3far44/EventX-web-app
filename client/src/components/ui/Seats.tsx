import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";

function getSeatStatusColor(seat: number): string {
  switch (seat) {
    case 0:
      return "bg-[#D9D9D9]";
    case 1:
      return "bg-[#6340B6]/60";
    case 2:
      return "bg-[#6340B6]";
    default:
      return "bg-[#D9D9D9]";
  }
}

const Seats = ({
  event,
  editState = false,
}: {
  event?: EventType;
  seatsMap: number[][];
  editState: boolean;
}) => {
  const {
    selectedSeats,
    seats,
    ticketState,
    totalTicketsPrice,
    ticketPrice,
    setTicketState,
    setTotalPrice,
    setNewSeatsMap,
    setSelectedSeats,
  } = useBookingTickets();


    const updateMapSeats = (
    rowIndex: number,
    colIndex: number,
    newValue: number
  ) => {
    setNewSeatsMap((prevGrid) => {
      const newSeatsMap = [...prevGrid];
      newSeatsMap[rowIndex] = [...newSeatsMap[rowIndex]];
      newSeatsMap[rowIndex][colIndex] = newValue;
      // if (ticketState === "buy" || ticketState === "reserve") {
      //   setTotalPrice((prev) => prev + );
      // }
      console.log(newSeatsMap);
      return newSeatsMap;
    });
  };
  // setNewSeatsMap(seatsMap);

  const handleClickSeat = (row: number, column: number, newValue: number) => {
    const nameSeat = `${String.fromCharCode(65 + row)}-${column + 1}`;
    updateMapSeats(row, column, newValue)
    setTotalPrice((prev => prev + ticketPrice))
    setSelectedSeats((prev) => {
      if (!prev.includes(nameSeat)) {
        return [...prev, nameSeat];
      } else {
        return prev;
      }
    });
  };

  return (
    <div className="p-8 bg-zinc-50 rounded-md text-black animate-scale">
      {event && !editState && (
        <div className="p-4">
          <h1>{event?.name}</h1>
          <p>Event Date: {new Date(event.datetime).toLocaleDateString()}</p>
          <p>Event Time: {new Date(event.datetime).toLocaleTimeString()}</p>
          <p>Total Seats: {event.seatsAmount}</p>
          <p>Available: {event.availableSeats}</p>
          <p>Reserved Seats: {event.seatsAmount - event.availableSeats}</p>
        </div>
      )}
      <div className="flex justify-start items-center space-x-4">
        <Button
          className="disabled:bg-zinc-500 disabled:cursor-not-allowed"
          disabled={ticketState === "reserve"}
          onClick={() => {
            setTicketState("reserve");
          }}
        >
          Reserve
        </Button>
        <Button
          className="disabled:bg-zinc-500 disabled:cursor-not-allowed"
          disabled={ticketState === "buy"}
          onClick={() => {
            setTicketState("buy");
          }}
        >
          Buy Ticket
        </Button>
      </div>
      <h1 className="text-center text-xl font-semibold my-4">
        Preview Seats Allocation:
      </h1>

      <div className="flex items-center gap-8 justify-center my-8">
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-4 h-4 rounded-sm ${getSeatStatusColor(0)}`}
          ></span>{" "}
          <span>Available Seats</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-4 h-4 rounded-sm ${getSeatStatusColor(1)}`}
          ></span>{" "}
          <span>Reserved Seats</span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span
            className={`w-4 h-4 rounded-sm ${getSeatStatusColor(2)}`}
          ></span>{" "}
          <span>Paid Seats</span>
        </div>
      </div>
      {editState ? (
        <>
          {seats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center space-2"
            >
              {row.map((column, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    className={`w-12 h-12   rounded-md   flex items-center justify-center  m-1 ${getSeatStatusColor(
                      column
                    )}`}
                  ></div>
                );
              })}
            </div>
          ))}
        </>
      ) : (
        <>
          {seats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center space-2"
            >
              {row.map((column, colIndex) => {
                return (
                  <div
                    key={colIndex}
                    onClick={() =>
                      handleClickSeat(
                        rowIndex,
                        colIndex,
                        ticketState === "reserve"
                          ? 1
                          : ticketState === "buy"
                          ? 2
                          : 0
                      )
                    }
                    className={`w-12 h-12 cursor-pointer hover:opacity-85 duration-300   rounded-md  hover:scale-95 flex items-center justify-center  m-1 ${getSeatStatusColor(
                      column
                    )}`}
                  ></div>
                );
              })}
            </div>
          ))}
          <Card className="p-4 flex flex-col items-start justify-center  gap-4 my-8">
            <h1>Ticket Seats</h1>
            <div className="space-x-2 flex justify-start items-start">
              {selectedSeats.map((seat) => {
                return <Badge className="inline-flex">{seat}</Badge>;
              })}
            </div>

            <span className="ml-auto ">
              Total Tickets Price{" "}
              <span className="text-2xl font-bold">
                {totalTicketsPrice.toLocaleString()} EGP
              </span>
            </span>
          </Card>

          <div className="w-full space-x-8 flex justify-center items-center">
            <Link
              className="w-full p-4  rounded-md bg-violet-500 text-center  text-sm text-white hover:bg-violet-600 duration-300 cursor-pointer "
              to={`/checkout/${event?._id}`}
            >
              {ticketState.toUpperCase()} TICKETS
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;
