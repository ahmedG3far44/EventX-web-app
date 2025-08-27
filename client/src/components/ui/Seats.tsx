// import { useState } from "react";

import { useState } from "react";
import type { EventType } from "@/lib/types";

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
  event: EventType;
  seatsMap: number[][];
  editState: boolean;
}) => {
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const ticketPrice = 34;
  const [seats, setNewSeatsMap] = useState<number[][]>(
    seatsMap || [
      [0, 2, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 1, 0, 0],
      [0, 1, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 0, 0, 0],
    ]
  );
  const [ticketState, setTicketStat] = useState<"book" | "buy">("buy");
  const [totalTicketsPrice, setTotalPrice] = useState(0);

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
    <div className="p-4 bg-zinc-50 rounded-2xl shadow-md text-black">
      {editState ? (
        <>
          <h1 className="text-center text-xl font-semibold my-4">Preview Seats Allocation:</h1>
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
          <div className="p-2 flex items-center space-x-4 "></div>
          <div>
            {ticketState === "book" ? 1 : 2} Total Price: {totalTicketsPrice}
          </div>
          {seats.map((row, rowIndex) => (
            <div
              key={rowIndex}
              className="flex items-center justify-center space-2"
            >
              {row.map((column, colIndex) => {
                // const seatName = `${String.fromCharCode(65 + rowIndex)}-${
                //   colIndex + 1
                // }`;
                // console.log(seatName);
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
        </>
      )}
    </div>
  );
};

export default Seats;
