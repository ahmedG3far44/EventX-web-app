import {
  Calendar,
  Clock,
  MapPin,
  MoreHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";

import { Link } from "react-router-dom";
import type { EventType } from "@/lib/types";

const EventCard = ({ event }: { event: EventType }) => {
  const eventTime = new Date(event.datetime);
  const eventDate = new Date(event.datetime);
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()}EGP`;
  };
  return (
    <div className="bg-white min-w-[300px] rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{event.name}</h3>
        <button className="text-gray-400 hover:text-gray-600">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400" />
          Venue: {event.venue}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Calendar className="w-4 h-4 mr-2 text-gray-400" />
          Date: {eventDate.toLocaleDateString()}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          Time: {eventTime.toLocaleTimeString()}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-600">
            {formatCurrency(event.ticketTypes.price)}
          </div>
          <div className="flex items-center text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {event.availableSeats}
          </div>
          <div className="flex items-center text-purple-600">
            <Users className="w-4 h-4 mr-1" />
            {event.seatsAmount - event.availableSeats}
          </div>
        </div>
        <Link
          to={`/event/${event._id}`}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
            →
          </span>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
