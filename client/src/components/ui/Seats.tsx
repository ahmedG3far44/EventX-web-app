// import { useState } from "react";

import { useState } from "react";
import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";

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
  seatsMap,
  editState = true,
}: {
  event?: EventType;
  seatsMap: number[][];
  editState: boolean;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const ticketPrice = event ? event.ticketTypes.price : 25;
  const [seats, setNewSeatsMap] = useState<number[][]>(
    seatsMap || [
      [0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
    ]
  );
  const [ticketState] = useState<"book" | "buy">("buy");
  const [totalTicketsPrice, setTotalPrice] = useState(0);
  console.log(totalTicketsPrice);
  const updateMapSeats = (
    rowIndex: number,
    colIndex: number,
    newValue: number
  ) => {
    setNewSeatsMap((prevGrid) => {
      const newSeatsMap = [...prevGrid];
      newSeatsMap[rowIndex] = [...newSeatsMap[rowIndex]];
      newSeatsMap[rowIndex][colIndex] = newValue;
      if (ticketState === "buy") {
        setTotalPrice((prev) => prev + ticketPrice);
      }
      return newSeatsMap;
    });
  };
  const handleClickSeat = (row: number, column: number, newValue: number) => {
    const nameSeat = `${String.fromCharCode(65 + row)}-${column + 1}`;
    console.log(nameSeat);
    // update 2D array Seats Map
    updateMapSeats(row, column, newValue);
    // add name seat to array
    setSelectedSeats((prev) => {
      if (!prev.includes(nameSeat)) {
        return [...prev, nameSeat];
      } else {
        return prev;
      }
    });

    console.log(selectedSeats);
    // calc total price
  };

  return (
    <div className="p-4 bg-zinc-50  shadow-md  min-h-screen text-black">
      {event && (
        <div className="p-4">
          <h1>{event?.name}</h1>
          <p>Event Date: {new Date(event.datetime).toLocaleDateString()}</p>
          <p>Event Time: {new Date(event.datetime).toLocaleTimeString()}</p>
          <p>Total Seats: {event.seatsAmount}</p>
          <p>Available: {event.availableSeats}</p>
          <p>Reserved Seats: {event.seatsAmount - event.availableSeats}</p>
        </div>
      )}
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
                        ticketState === "book" ? 1 : 2
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
          <Card className="p-4 flex items-center justify-start flex-row gap-4 my-8">
            <h1>Ticket Seats</h1>
            {selectedSeats.map((seat) => {
              return <Badge className="inline-flex">{seat}</Badge>;
            })}
            <span className="ml-auto ">
              Total Tickets Price{" "}
              <span className="text-2xl font-bold">
                {totalTicketsPrice.toLocaleString()} EGP
              </span>
            </span>
          </Card>

          <div className="w-full space-x-8 flex items-center">
            <Link
              className="block w-1/2 px-4 py-2  rounded-md bg-purple-500 text-white hover:bg-purple-600 duration-300 cursor-pointer "
              to={`/checkout/${event?._id}`}
            >
              Buy Ticket
            </Link>
            <Button className="w-1/2 px-4 py-2  rounded-md bg-purple-500 text-white hover:bg-purple-600 duration-300 cursor-pointer ">
              Cancel Payment
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Seats;
