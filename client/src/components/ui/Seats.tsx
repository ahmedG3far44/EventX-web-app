import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { MapPin, Ticket, X, Armchair } from "lucide-react";
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
    handleTickets,
    setTicketState,
    setSelectedSeats,
    loading,
    error,
  } = useBookingTickets();

  const isModeChosen = ticketState === "reserve" || ticketState === "buy";
  const isBuyMode = ticketState === "buy";

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
      <div className="text-center py-8">
        <Armchair className="w-10 h-10 mx-auto text-gray-300 mb-3" />
        <p className="text-sm text-gray-500">
          Choose <span className="font-semibold text-gray-700">Reserve</span> or{" "}
          <span className="font-semibold text-gray-700">Buy</span> above to select seats.
        </p>
      </div>
    );
  if (error)
    return (
      <div className="text-center text-sm text-red-600 bg-red-50 border border-red-100 p-4 rounded-xl mb-4">
        {error}
      </div>
    );

  return (
    <div className="bg-white p-3 sm:p-5 md:p-6 shadow-sm border border-gray-100 rounded-xl w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5">
        <Button
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer duration-300 w-full sm:w-auto ${
            ticketState === "reserve"
              ? "bg-amber-500 hover:bg-amber-600 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={ticketState === "reserve"}
          onClick={() => setTicketState("reserve")}
        >
          Reserve Seats
        </Button>
        <Button
          className={`px-6 py-2.5 rounded-xl font-semibold transition-all cursor-pointer duration-300 w-full sm:w-auto ${
            ticketState === "buy"
              ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              : "bg-gray-100 hover:bg-gray-200 text-gray-600"
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={ticketState === "buy"}
          onClick={() => setTicketState("buy")}
        >
          Buy Tickets
        </Button>
      </div>

      <Card className="p-3 sm:p-5 border border-gray-100 bg-white">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-6 sm:px-10 py-2 rounded-lg shadow-md">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-semibold text-sm sm:text-base tracking-wider">STAGE</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-5">
            {[
              { color: "bg-green-100 border-green-300", label: "Available" },
              { color: "bg-yellow-100 border-yellow-400", label: "Reserved" },
              { color: "bg-red-100 border-red-400", label: "Paid" },
              {
                color: isBuyMode
                  ? "bg-indigo-500 border-indigo-600"
                  : "bg-amber-400 border-amber-500",
                label: isBuyMode ? "To Buy" : "To Reserve",
              },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-1.5">
                <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded border-2 ${item.color}`} />
                <span className="text-xs sm:text-sm text-gray-600">{item.label}</span>
              </div>
            ))}
          </div>

          <div className="w-full overflow-x-auto pb-1 -mx-1 px-1">
            <div className="flex justify-center min-w-max">
              <div>
                {seatMap.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center items-center gap-1 sm:gap-1.5 mb-1"
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold text-gray-400 text-[10px] sm:text-xs">
                      {getRowLabel(rowIndex)}
                    </div>
                    <div className="flex gap-0.5 sm:gap-1">
                      {row.map((seatStatus, colIndex) => {
                        const selected = isSeatSelected(rowIndex, colIndex);
                        const isInteractive = seatStatus === 0 || selected;
                        return (
                          <div
                            key={colIndex}
                            className={`
                              w-6 h-6 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded border sm:rounded-lg sm:border-2
                              flex items-center justify-center text-[8px] sm:text-xs font-bold
                              transition-all duration-200
                              ${getSeatStyles(seatStatus, selected, isBuyMode)}
                              ${
                                isInteractive && isModeChosen
                                  ? "cursor-pointer hover:scale-105 hover:shadow-sm"
                                  : "cursor-not-allowed opacity-60"
                              }
                            `}
                            onClick={() => {
                              if (!isModeChosen) return;
                              handleClickSeat(rowIndex, colIndex, seatStatus);
                            }}
                            title={`${getRowLabel(rowIndex)}${colIndex + 1} - ${getSeatLabel(seatStatus, selected)}`}
                          >
                            <Armchair className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5" />
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center font-bold text-gray-400 text-[10px] sm:text-xs">
                      {getRowLabel(rowIndex)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm text-gray-500 border-t border-gray-100 pt-3 w-full justify-center">
            <span>Total: <strong className="text-gray-700">{seatMap.flat().length}</strong></span>
            <span>Available: <strong className="text-emerald-600">{counts.available}</strong></span>
            <span>Reserved: <strong className="text-amber-600">{counts.reserved}</strong></span>
            <span>Paid: <strong className="text-red-600">{counts.paid}</strong></span>
            <span>Selected: <strong className="text-purple-600">{counts.selected}</strong></span>
          </div>
        </div>
      </Card>

      <div className="mt-4 space-y-3">
        {reserveTicketSuccess && (
          <div className="bg-emerald-50 border border-emerald-200 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <p className="font-medium text-emerald-700 text-sm">
                Tickets reserved successfully!
              </p>
            </div>
            <button
              className="p-1 rounded-md hover:bg-emerald-100 transition-colors cursor-pointer shrink-0"
              onClick={() => setReserveTicketSuccess(false)}
              aria-label="Dismiss"
            >
              <X size={16} className="text-emerald-500" />
            </button>
          </div>
        )}

        {selectedSeats.length > 0 && (
          <Card className="bg-gray-50 border border-gray-100 p-4 sm:p-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-800 flex items-center gap-2 mb-2 text-sm">
                  <Ticket className="w-4 h-4 text-purple-500" />
                  Selected ({selectedSeats.length})
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {selectedSeats.map((seat, index) => (
                    <Badge
                      key={index}
                      className="bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-md font-medium text-xs"
                    >
                      {seat}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <p className="text-xs text-gray-500">Total Price</p>
                <p className="text-xl sm:text-2xl font-bold text-gray-900">
                  {totalTicketsPrice.toLocaleString()}
                  <span className="text-sm text-gray-500 font-normal ml-0.5">EGP</span>
                </p>
              </div>
            </div>
          </Card>
        )}

        {selectedSeats.length > 0 && (
          <>
            {isBuyMode ? (
              <Link
                className="w-full flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] gap-2"
                to={`/checkout/${eventDetails?._id ?? ""}`}
              >
                <Ticket className="w-4 h-4" />
                Proceed to Checkout
              </Link>
            ) : (
              <button
                disabled={loading}
                className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-3.5 rounded-xl font-semibold text-sm sm:text-base transition-all duration-300 shadow-md hover:shadow-lg active:scale-[0.98] gap-2 cursor-pointer"
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
                <Ticket className="w-4 h-4" />
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                    Reserving...
                  </span>
                ) : (
                  "Reserve Now"
                )}
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Seats;