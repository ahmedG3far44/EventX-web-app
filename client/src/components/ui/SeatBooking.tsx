import { useBookingTickets } from "@/contexts/BookingTicketsProvider";
import { useNavigate } from "react-router-dom";

const SeatBooking = () => {

  const navigate = useNavigate();
  const {
    seats,
    selectedSeats,
    getSeatClassName,
    getTotalPrice,
    getSelectedSeatCount,
    handleSeatClick,
  } = useBookingTickets();



  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Seat Allocation
      </h2>
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
          onClick={() => navigate("payment")}
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
