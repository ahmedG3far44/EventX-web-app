import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { MapPin, Ticket, LucideX, Armchair } from "lucide-react";
import { useState } from "react";

function getSeatStyles(
  seatStatus: number,
  isSelected: boolean,
  isBuyMode: boolean
) {
  if (isSelected) {
    return isBuyMode
      ? "bg-indigo-500 border-indigo-600 text-white shadow-md"
      : "bg-amber-400 border-amber-500 text-white shadow-md";
  }
  switch (seatStatus) {
    case 0:
      return "bg-green-100 border-green-300 text-green-700 hover:bg-green-200";
    case 1:
      return "bg-yellow-100 border-yellow-400 text-yellow-800";
    case 2:
      return "bg-red-100 border-red-400 text-red-800";
    default:
      return "bg-gray-100 border-gray-300 text-gray-500";
  }
}

function getSeatLabel(seatStatus: number, isSelected: boolean): string {
  if (isSelected) return "Selected";
  switch (seatStatus) {
    case 0: return "Available";
    case 1: return "Reserved";
    case 2: return "Paid";
    default: return "Unavailable";
  }
}

const Seats = ({ eventDetails }: { eventDetails: EventType }) => {
  const [reserveTicketSuccess, setReserveTicketSuccess] =
    useState<boolean>(false);
  const {
    selectedSeats,
    ticketState,
    totalTicketsPrice,
    ticketPrice,
    handleTickets,
    setTicketState,
    setSelectedSeats,
    loading,
    error,
  } = useBookingTickets();

  const isModeChosen = ticketState === "reserve" || ticketState === "buy";
  const isBuyMode = ticketState === "buy";
  const actionLabel = ticketState.toUpperCase();

  const isSeatSelected = (row: number, col: number) => {
    const name = `${String.fromCharCode(65 + row)}-${col + 1}`;
    return selectedSeats.includes(name);
  };

  const handleClickSeat = (row: number, column: number, seatStatus: number) => {
    const nameSeat = `${String.fromCharCode(65 + row)}-${column + 1}`;
    setSelectedSeats((prev) => {
      if (prev.includes(nameSeat)) {
        return prev.filter((seat) => seat !== nameSeat);
      }
      if (seatStatus !== 0) return prev;
      return [...prev, nameSeat];
    });
  };

  const getRowLabel = (index: number): string =>
    String.fromCharCode(65 + index);

  const seatMap = eventDetails?.seatsMap ?? [];

  const counts = { available: 0, reserved: 0, paid: 0, selected: 0 };
  seatMap.forEach((row, ri) =>
    row.forEach((status, ci) => {
      if (isSeatSelected(ri, ci)) counts.selected++;
      else if (status === 0) counts.available++;
      else if (status === 1) counts.reserved++;
      else if (status === 2) counts.paid++;
    })
  );

  if (!isModeChosen)
    return (
      <p className="text-center text-sm text-gray-600 mb-4">
        Please choose <span className="font-semibold">Reserve</span> or{" "}
        <span className="font-semibold">Buy</span> before selecting seats.
      </p>
    );
  if (error)
    return (
      <p className="text-center text-sm text-red-600 p-4 rounded-2xl shadow mb-4">
        {error}
      </p>
    );

  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-3 sm:p-4 md:p-6 shadow-md rounded-md w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-4">
        <Button
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer duration-300 w-full sm:w-auto ${
            ticketState === "reserve"
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={ticketState === "reserve"}
          onClick={() => setTicketState("reserve")}
        >
          Reserve Seats
        </Button>
        <Button
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer duration-300 w-full sm:w-auto ${
            ticketState === "buy"
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg"
              : "bg-gray-200 hover:bg-gray-300 text-gray-700"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={ticketState === "buy"}
          onClick={() => setTicketState("buy")}
        >
          Buy Tickets
        </Button>
      </div>

      <Card className="p-3 sm:p-4 md:p-5 border-0 bg-white/95 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-3">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 sm:px-8 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-base sm:text-lg">STAGE</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-green-300 bg-green-100" />
              <span className="text-xs sm:text-sm text-gray-700">Available</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-yellow-400 bg-yellow-100" />
              <span className="text-xs sm:text-sm text-gray-700">Reserved</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-4 h-4 sm:w-5 sm:h-5 rounded border-2 border-red-400 bg-red-100" />
              <span className="text-xs sm:text-sm text-gray-700">Paid</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div
                className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 ${
                  isBuyMode
                    ? "border-indigo-600 bg-indigo-500"
                    : "border-amber-500 bg-amber-400"
                }`}
              />
              <span className="text-xs sm:text-sm text-gray-700 font-medium">
                {isBuyMode ? "To Buy" : "To Reserve"}
              </span>
            </div>
          </div>

          <div className="w-full overflow-x-auto pb-2">
            <div className="flex justify-center min-w-max">
              <div>
                {seatMap.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center items-center gap-1.5 sm:gap-2 mb-1.5"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-gray-600 text-xs sm:text-sm">
                      {getRowLabel(rowIndex)}
                    </div>
                    <div className="flex gap-1 sm:gap-1.5">
                      {row.map((seatStatus, colIndex) => {
                        const selected = isSeatSelected(rowIndex, colIndex);
                        const isInteractive = seatStatus === 0 || selected;
                        return (
                          <div
                            key={colIndex}
                            className={`
                              w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 rounded-lg border-2
                              flex items-center justify-center text-xs font-bold
                              transition-all duration-200
                              ${getSeatStyles(seatStatus, selected, isBuyMode)}
                              ${
                                isInteractive && isModeChosen
                                  ? "cursor-pointer hover:scale-105 hover:shadow-md"
                                  : "cursor-not-allowed opacity-70"
                              }
                            `}
                            onClick={() => {
                              if (!isModeChosen) return;
                              handleClickSeat(rowIndex, colIndex, seatStatus);
                            }}
                            title={`${getRowLabel(rowIndex)}${colIndex + 1} - ${getSeatLabel(seatStatus, selected)}`}
                          >
                            <Armchair className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center font-bold text-gray-600 text-xs sm:text-sm">
                      {getRowLabel(rowIndex)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600">
            <span>Total: {seatMap.flat().length}</span>
            <span>Available: {counts.available}</span>
            <span>Reserved: {counts.reserved}</span>
            <span>Paid: {counts.paid}</span>
            <span className="font-semibold">Selected: {counts.selected}</span>
          </div>
        </div>
      </Card>

      <div className="mt-4">
        {selectedSeats.length > 0 && (
          <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-4 sm:p-5 mb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2">
                  <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                  Selected Seats ({selectedSeats.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seat, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-100 text-purple-800 border border-purple-300 px-2.5 py-1 rounded-full font-medium text-xs sm:text-sm"
                    >
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-left sm:text-right">
                <p className="text-xs sm:text-sm text-gray-600">Total Price</p>
                <p className="text-2xl sm:text-3xl font-bold text-purple-600">
                  ${totalTicketsPrice.toLocaleString()}
                </p>
              </div>
            </div>
          </Card>
        )}

        {reserveTicketSuccess && (
          <div className="text-green-500 bg-green-50 border-green-100 border p-3 sm:p-4 rounded-2xl shadow-sm flex justify-between items-center mb-4">
            <p className="font-semibold text-sm sm:text-base">
              Your tickets {actionLabel} done successfully
            </p>
            <Button
              className="ml-auto bg-green-700 text-white cursor-pointer hover:bg-green-600"
              onClick={() => setReserveTicketSuccess(false)}
            >
              <LucideX size={20} />
            </Button>
          </div>
        )}

        {selectedSeats.length > 0 && (
          <div className="flex justify-center">
            {isBuyMode ? (
              <Link
                className="w-full text-center flex items-center justify-center bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] gap-2"
                to={`/checkout/${eventDetails?._id ?? ""}`}
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                BUY TICKETS
              </Link>
            ) : (
              <button
                disabled={loading}
                className="w-full text-center flex items-center justify-center bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 disabled:bg-zinc-400 cursor-pointer disabled:cursor-not-allowed text-white px-8 sm:px-12 py-3 sm:py-4 rounded-xl font-semibold text-base sm:text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] gap-2"
                onClick={async () => {
                  await handleTickets({
                    paymentMethod: "reserved",
                    cardName: "",
                    cardNumber: "",
                    expiryDate: "",
                    cvc: "",
                  });
                  setReserveTicketSuccess(true);
                }}
              >
                <Ticket className="w-4 h-4 sm:w-5 sm:h-5" />
                {loading ? "Reserving..." : "RESERVE"}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Seats;