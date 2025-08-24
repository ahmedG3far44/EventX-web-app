/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const SeatBooking = () => {
  const initializeSeats = () => {
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

  const [seats, setSeats] = useState(initializeSeats());
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

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
  };

  const getSeatClassName = (
    seat: { id?: number; row?: number; number?: number; status: any },
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

  const getSelectedSeatCount = () => selectedSeats.length;
  const getTotalPrice = () => getSelectedSeatCount() * 25; // $25 per seat

  const handleBooking = () => {
    if (selectedSeats.length === 0) return;

    alert(`Booking ${selectedSeats.length} seat(s) for $${getTotalPrice()}`);

    // Update seat status to reserved after booking
    const newSeats = seats.map((row, rowIndex) =>
      row.map((seat, seatIndex) => {
        const seatKey = `${rowIndex}-${seatIndex}`;
        if (selectedSeats.includes(seatKey)) {
          return { ...seat, status: "reserved" };
        }
        return seat;
      })
    );

    setSeats(newSeats);
    setSelectedSeats([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Seat Allocation
      </h2>

      {/* Legend */}
      <div className="flex justify-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-600"></div>
          <span className="text-sm text-gray-600">Paid Seats</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-purple-400"></div>
          <span className="text-sm text-gray-600">Reserved Seats</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-gray-300"></div>
          <span className="text-sm text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded bg-green-500"></div>
          <span className="text-sm text-gray-600">Selected</span>
        </div>
      </div>

      {/* Stage */}
      <div className="text-center mb-8">
        <div className="inline-block bg-gray-800 text-white px-8 py-2 rounded-lg">
          STAGE
        </div>
      </div>

      {/* Seating Chart */}
      <div className="space-y-4 mb-8">
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center gap-2">
            <div className="w-8 flex items-center justify-center text-sm font-semibold text-gray-600">
              {String.fromCharCode(65 + rowIndex)}
            </div>
            <div className="flex gap-2">
              {row.map((seat, seatIndex) => (
                <button
                  key={seat.id}
                  onClick={() => handleSeatClick(rowIndex, seatIndex)}
                  className={getSeatClassName(seat, rowIndex, seatIndex)}
                  disabled={
                    seat.status === "paid" || seat.status === "reserved"
                  }
                  title={`Seat ${String.fromCharCode(65 + rowIndex)}${
                    seat.number
                  } - ${seat.status}`}
                >
                  <span className="text-xs font-semibold">{seat.number}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Booking Summary */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-lg font-semibold text-gray-800">
              Selected Seats: {getSelectedSeatCount()}
            </p>
            <p className="text-sm text-gray-600">
              {selectedSeats.map((seatKey, index) => {
                const [rowIndex, seatIndex] = seatKey.split("-").map(Number);
                const rowLetter = String.fromCharCode(65 + rowIndex);
                const seatNumber = seats[rowIndex][seatIndex].number;
                return `${rowLetter}${seatNumber}${
                  index < selectedSeats.length - 1 ? ", " : ""
                }`;
              })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-purple-600">
              ${getTotalPrice()}
            </p>
            <p className="text-sm text-gray-600">Total Price</p>
          </div>
        </div>

        <button
          onClick={handleBooking}
          disabled={selectedSeats.length === 0}
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
            selectedSeats.length > 0
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {selectedSeats.length > 0
            ? "Book Selected Seats"
            : "Select Seats to Book"}
        </button>
      </div>
    </div>
  );
};

export default SeatBooking;
