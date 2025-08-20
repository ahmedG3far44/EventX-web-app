import { Calendar, MapPin, Users, Tag, Clock, DollarSign } from "lucide-react";
import type { EventType } from "@/lib/types";
import { Link } from "react-router-dom";

// Helper function to format date
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "sold out":
      return "bg-red-100 text-red-800 border-red-200";
    case "upcoming":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "cancelled":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const EventCard = (event: EventType) => {
  const created = new Date(event.createdAt);
  const dateTime = new Date(event.dateTime);
  const minPrice = Math.min(...event.ticketTypes.map((t) => t.price));
  const totalAvailable = event.ticketTypes.reduce(
    (sum, ticket) => sum + ticket.available,
    0
  );

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300 max-w-2xl">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="flex justify-between items-start mb-3">
          <Link
            to={`/event/${event._id}`}
            className="text-2xl font-bold text-gray-900 leading-tight hover:underline cursor-pointer"
          >
            {event.title}
          </Link>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              event.status
            )}`}
          >
            {event.status}
          </span>
        </div>

        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {event.description}
        </p>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="flex items-center text-gray-700">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <div className="text-sm">
              <div className="font-medium">
                {formatDate(created.toString())}
              </div>
              <div className="text-gray-500">
                {formatTime(dateTime.toString())}
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <MapPin className="w-4 h-4 mr-2 text-red-600" />
            <div className="text-sm">
              <div className="font-medium">{event.venue.name}</div>
              <div className="text-gray-500">
                {event.venue.address.city}, {event.venue.address.state}
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <Users className="w-4 h-4 mr-2 text-green-600" />
            <div className="text-sm">
              <div className="font-medium">
                Capacity: {event.venue.capacity}
              </div>
              <div className="text-gray-500">
                {totalAvailable} tickets available
              </div>
            </div>
          </div>

          <div className="flex items-center text-gray-700">
            <DollarSign className="w-4 h-4 mr-2 text-yellow-600" />
            <div className="text-sm">
              <div className="font-medium">From ${minPrice}</div>
              <div className="text-gray-500">
                {event.ticketTypes.length} ticket types
              </div>
            </div>
          </div>
        </div>

        {/* Tags and Category */}
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-md text-xs font-medium">
            {event.category}
          </span>
          {event.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium flex items-center"
            >
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Ticket Types */}
      <div className="border-t border-gray-100 p-6 pt-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
          <Clock className="w-4 h-4 mr-2" />
          Available Tickets
        </h3>
        <div className="space-y-3">
          {event?.ticketTypes?.map((ticket) => (
            <div
              key={ticket._id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <div className="flex-1">
                <div className="font-medium text-gray-900">{ticket.name}</div>
                <div className="text-sm text-gray-600">
                  {ticket.available} seats available
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-gray-900">
                  ${ticket.price}
                </div>
                <div
                  className={`text-xs font-medium ${
                    ticket.available > 0 ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {ticket.available > 0 ? "Available" : "Sold Out"}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 text-xs text-gray-500">
          Event created: {formatDate(created.toString())}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
