import {
  Calendar,
  Clock,
  DollarSign,
  MapPin,
  MoreHorizontal,
  TrendingUp,
  Users,
} from "lucide-react";
import type React from "react";
import type { Event } from "../admin/ManageEvents";
import { Link } from "react-router-dom";

const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const formatCurrency = (amount: number) => {
    return `${amount.toLocaleString()}KR`;
  };
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-lg">{event.title}</h3>
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
          Date: {event.date}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2 text-gray-400" />
          Time: {event.time}
        </div>
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center text-green-600">
            <DollarSign className="w-4 h-4 mr-1" />
            {formatCurrency(event.price)}
          </div>
          <div className="flex items-center text-red-600">
            <TrendingUp className="w-4 h-4 mr-1" />
            {event.sold}
          </div>
          <div className="flex items-center text-purple-600">
            <Users className="w-4 h-4 mr-1" />
            {event.capacity}
          </div>
        </div>
        <Link
          to={`${event.id}`}
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
