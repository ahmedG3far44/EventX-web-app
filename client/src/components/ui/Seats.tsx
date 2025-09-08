import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";
import { Card } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { MapPin, Ticket, LucideX } from "lucide-react";
import { useEffect, useState } from "react";

function getSeatStatusColor(seat: number): string {
  switch (seat) {
    case 0:
      return "bg-green-100 hover:bg-green-200 border-green-300 text-green-700";
    case 1:
      return "bg-yellow-100 border-yellow-300 text-yellow-700";
    case 2:
      return "bg-red-100 border-red-300 text-red-700";
    default:
      return "bg-gray-100 border-gray-300 text-gray-700";
  }
}

function getSeatStatusLabel(seat: number): string {
  switch (seat) {
    case 0:
      return "Available";
    case 1:
      return "Reserved";
    case 2:
      return "Paid";
    default:
      return "Unavailable";
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
    setTotalPrice,
    setNewSeatsMap,
    setSelectedSeats,
    loading,
    error,
  } = useBookingTickets();

  const isModeChosen = ticketState === "reserve" || ticketState === "buy";
  const actionLabel = (ticketState ?? "reserve").toUpperCase();
  useEffect(() => {
    if (eventDetails?.seatsMap) {
      setNewSeatsMap(eventDetails.seatsMap);
    }
  }, []);

  const updateMapSeats = (
    rowIndex: number,
    colIndex: number,
    newValue: number
  ) => {
    setNewSeatsMap((prevGrid) => {
      const newSeatsMap = [...prevGrid];
      newSeatsMap[rowIndex] = [...newSeatsMap[rowIndex]];
      newSeatsMap[rowIndex][colIndex] = newValue;
      return newSeatsMap;
    });
  };
  const getNewSeatValue = () =>
    ticketState === "reserve" ? 1 : ticketState === "buy" ? 2 : 0;

  const handleClickSeat = (row: number, column: number, newValue: number) => {
    const nameSeat = `${String.fromCharCode(65 + row)}-${column + 1}`;
    setSelectedSeats((prev) => {
      if (!prev.includes(nameSeat)) {
        updateMapSeats(row, column, newValue);
        setTotalPrice((p) => p + ticketPrice);
        return [...prev, nameSeat];
      } else {
        updateMapSeats(row, column, 0);
        setTotalPrice((p) => Math.max(0, p - ticketPrice));
        return prev.filter((seat) => seat !== nameSeat);
      }
    });
  };

  const getRowLabel = (index: number): string => {
    return String.fromCharCode(65 + index);
  };

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
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8 shadow-md rounded-md">
      <div className="w-full mx-auto">
        {/* {eventDetails && (
          <Card className="mb-8 overflow-hidden shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <div className="py-4 px-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {eventDetails?.name}
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(eventDetails.datetime).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(eventDetails.datetime).toLocaleTimeString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">
                    Total: {eventDetails.seatsAmount}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Ticket className="w-4 h-4" />
                  <span className="text-sm">
                    Available: {eventDetails.availableSeats}
                  </span>
                </div>
              </div>
            </div>
          </Card>
        )} */}
        <Card className="mb-2  p-2 shadow-lg border-0 bg-white/90 backdrop-blur-sm">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className={`px-8 py-3 rounded-xl font-semibold transition-all cursor-pointer duration-300 ${
                ticketState === "reserve"
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={ticketState === "reserve"}
              onClick={() => setTicketState("reserve")}
            >
              Reserve Seats
            </Button>
            <Button
              className={`px-8 py-3 rounded-xl font-semibold transition-all cursor-pointer duration-300 ${
                ticketState === "buy"
                  ? "bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              } disabled:opacity-50 disabled:cursor-not-allowed`}
              disabled={ticketState === "buy"}
              onClick={() => setTicketState("buy")}
            >
              Buy Tickets
            </Button>
          </div>
        </Card>

        <Card className="p-2 md:p-4  flex flex-row items-center justify-center gap-2 border-0 bg-white/95 backdrop-blur-sm">
          <div className="flex flex-col gap-2 items-center justify-center">
            <div className="flex justify-center gap-4">
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white px-8 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold text-lg">STAGE</span>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 ">
              Seat Selection
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {[0, 1, 2].map((status) => (
                <div key={status} className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-lg border-2 ${getSeatStatusColor(
                      status
                    )}`}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    {getSeatStatusLabel(status)}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-center mb-8">
              <div className="inline-block">
                {eventDetails?.seatsMap?.map((row, rowIndex) => (
                  <div
                    key={rowIndex}
                    className="flex justify-center items-center gap-2 mb-2"
                  >
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 text-sm">
                      {getRowLabel(rowIndex)}
                    </div>
                    <div className="flex gap-1">
                      {row.map((seatStatus, colIndex) => {
                        const isAvailable = seatStatus === 0;
                        const isReserved = seatStatus === 1;
                        const isPaid = seatStatus === 2;
                        let seatStyles = "";
                        if (isAvailable) {
                          seatStyles =
                            "bg-green-100 border-green-300 text-green-700 hover:bg-green-200";
                        } else if (isReserved) {
                          seatStyles =
                            "bg-yellow-100 border-yellow-400 text-yellow-800";
                        } else if (isPaid) {
                          seatStyles = "bg-red-100 border-red-400 text-red-800";
                        } else {
                          seatStyles =
                            "bg-gray-100 border-gray-300 text-gray-500";
                        }
                        return (
                          <div
                            key={colIndex}
                            className={`
        w-10 h-10 md:w-12 md:h-12 rounded-lg border-2 
        flex items-center justify-center text-xs font-bold
        transition-all duration-200 
        ${seatStyles}
        ${
          isAvailable && isModeChosen
            ? "cursor-pointer hover:scale-105 hover:shadow-md"
            : "cursor-not-allowed opacity-60"
        }
      `}
                            onClick={() => {
                              if (!isModeChosen) return;

                              if (isAvailable) {
                                handleClickSeat(
                                  rowIndex,
                                  colIndex,
                                  getNewSeatValue()
                                );
                              } else if (
                                isReserved &&
                                ticketState === "reserve"
                              ) {
                                handleClickSeat(rowIndex, colIndex, 0);
                              } else if (isPaid && ticketState === "buy") {
                                handleClickSeat(rowIndex, colIndex, 0);
                              }
                            }}
                            title={`${getRowLabel(rowIndex)}${colIndex + 1} - ${
                              isAvailable
                                ? "Available"
                                : isReserved
                                ? "Reserved"
                                : isPaid
                                ? "Paid"
                                : "Unavailable"
                            }`}
                          >
                            {colIndex + 1}
                          </div>
                        );
                      })}
                    </div>
                    <div className="w-8 h-8 flex items-center justify-center font-bold text-gray-600 text-sm">
                      {getRowLabel(rowIndex)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            {selectedSeats.length > 0 && (
              <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 mb-6">
                <>
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-2">
                    <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                      <Ticket className="w-5 h-5" />
                      Selected Seats
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedSeats.map((seat, index) => (
                      <Badge
                        key={index}
                        className="bg-purple-100 text-purple-800 border border-purple-300 px-3 py-1 rounded-full font-medium"
                      >
                        {seat}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-left">
                    <p className="text-sm text-gray-600 mb-1">Total Price</p>
                    <p className="text-3xl font-bold text-purple-600">
                      {totalTicketsPrice.toLocaleString()} EGP
                    </p>
                  </div>
                </>
              </Card>
            )}

            {reserveTicketSuccess && (
              <div className="text-green-500 bg-green-50 border-green-100 border p-4 rounded-2xl shadow-sm flex justify-between items-center ">
                <p className="font-semibold">
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
                {actionLabel === "BUY" ? (
                  <Link
                    className="w-full text-center flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                    to={`/checkout/${eventDetails?._id ?? ""}`}
                  >
                    <Ticket className="w-5 h-5" />
                    {actionLabel} TICKETS
                  </Link>
                ) : (
                  <button
                    disabled={loading}
                    className="w-full text-center flex items-center justify-center bg-gradient-to-r disabled:bg-zinc-400 cursor-pointer disabled:cursor-not-allowed from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 inline-flex items-center gap-2"
                    onClick={() => {
                      handleTickets({
                        paymentMethod: "card",
                        cardName: "Dummy User",
                        cardNumber: "4848-4848-4848-4848",
                        expiryDate: "09/29",
                        cvc: "223",
                      });
                      setReserveTicketSuccess(true);
                    }}
                  >
                    <Ticket className="w-5 h-5" />
                    {loading ? "reserving process..." : actionLabel}
                  </button>
                )}
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Seats;
