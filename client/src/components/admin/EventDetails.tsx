import React from "react";
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Edit3,
  BarChart3,
  ArrowLeft,
  Ticket,
  ShoppingCart,
  UserCheck,
  Star,
} from "lucide-react";

interface EventDetailsProps {
  eventData?: {
    name: string;
    date: string;
    venue: string;
    time: string;
    description: string;
    ticketPrice: number;
    currency: string;
    seatAmount: number;
    availableSeats: number;
    popularity: string;
    tags: string[];
    expectedAttendance: number;
    qrCode?: string;
  };
}

const EventDetails: React.FC<EventDetailsProps> = ({ eventData }) => {
  // Default data based on the image
  const defaultData = {
    name: "Colombo Music Festival 2025",
    date: "April 12, 2025",
    venue: "Viharamahadevi Open Air Theater, Colombo",
    time: "6:00PM - 10:30PM",
    description:
      "Get ready for Sri Lanka's biggest music festival - the Colombo Music Festival 2025! 🎵🔥 This electrifying open-air concert will feature top international and local artists, bringing an unforgettable night of music, lights, and energy to the heart of Colombo! Join 10,000+ music lovers at the Viharamahadevi Open Air Theater for a night filled with live performances, immersive stage effects, and a festival atmosphere like no other! Whether you're into pop, rock, EDM, or reggae, this festival has something for every music enthusiast!",
    ticketPrice: 2500,
    currency: "LKR",
    seatAmount: 1200,
    availableSeats: 523,
    popularity: "High Popularity",
    tags: ["#Music", "#Festival"],
    expectedAttendance: 1000,
    qrCode:
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSJ3aGl0ZSIvPgo8cmVjdCB4PSIxMCIgeT0iMTAiIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0iYmxhY2siLz4KPC9zdmc+",
  };

  const data = eventData || defaultData;

  // Seat allocation data
  const seatData = {
    paid: 677,
    reserved: 0,
    available: 523,
  };

  console.log(seatData);

  const generateSeatGrid = () => {
    const totalSeats = 100; // Simplified grid
    const seats = [];

    for (let i = 0; i < totalSeats; i++) {
      const random = Math.random();
      let seatType = "available";
      if (random < 0.6) seatType = "paid";
      else if (random < 0.65) seatType = "reserved";

      seats.push(
        <div
          key={i}
          className={`w-6 h-6 rounded-sm ${
            seatType === "paid"
              ? "bg-purple-600"
              : seatType === "reserved"
              ? "bg-purple-400"
              : "bg-gray-300"
          }`}
        />
      );
    }
    return seats;
  };

  return (
    <div className="w-full p-4 mx-auto bg-white">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Event Details</h1>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Event Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Name
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Edit3 className="w-5 h-5 text-gray-400" />
              <span className="font-medium">{data.name}</span>
            </div>
          </div>

          {/* Event Venue */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Venue
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <MapPin className="w-5 h-5 text-gray-400" />
              <span>{data.venue}</span>
            </div>
          </div>

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Description
            </label>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-700 leading-relaxed">
                {data.description}
              </p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Ticket className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Ticket Price
                </span>
              </div>
              <span className="text-lg font-bold">
                {data.ticketPrice}
                {data.currency}
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Seat Amount
                </span>
              </div>
              <span className="text-lg font-bold">{data.seatAmount}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Available Seats
                </span>
              </div>
              <span className="text-lg font-bold">{data.availableSeats}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Popularity
                </span>
              </div>
              <span className="text-sm font-medium text-green-600">
                {data.popularity}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Event Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Calendar className="w-5 h-5 text-gray-400" />
              <span>{data.date}</span>
            </div>
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Time
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{data.time}</span>
            </div>
          </div>

          {/* Seat Allocation */}
          <div className="p-6 bg-gray-50 rounded-lg border">
            <h3 className="text-lg font-bold text-center mb-4">
              Seat Allocation
            </h3>

            {/* Legend */}
            <div className="flex justify-center gap-4 mb-4 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-600 rounded"></div>
                <span>Paid Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded"></div>
                <span>Reserved Seats</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-gray-300 rounded"></div>
                <span>Available</span>
              </div>
            </div>

            {/* Seat Grid */}
            <div className="grid grid-cols-10 gap-1 max-w-xs mx-auto">
              {generateSeatGrid()}
            </div>
          </div>

          {/* Tags and Attendance */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="p-4 bg-gray-50 rounded-lg border">
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Attendance
              </label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                <Users className="w-5 h-5 text-gray-400" />
                <span className="font-medium">+{data.expectedAttendance}</span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="p-6 bg-gray-50 rounded-lg border text-center">
            <div className="w-24 h-24 bg-gray-200 mx-auto mb-3 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
              <div className="w-16 h-16 bg-black rounded grid grid-cols-4 gap-px p-1">
                {[...Array(16)].map((_, i) => (
                  <div
                    key={i}
                    className={`${
                      Math.random() > 0.5 ? "bg-white" : "bg-black"
                    } rounded-sm`}
                  ></div>
                ))}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              Scan QR code for easy payments
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              EDIT
            </button>
            <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2">
              <BarChart3 className="w-5 h-5" />
              Attendee Insights
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
