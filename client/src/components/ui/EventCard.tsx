import { Calendar, Clock, MapPin, Users, ChevronRight } from "lucide-react";

import { Link } from "react-router-dom";
import type { EventType } from "@/lib/types";

import { useAuth } from "@/contexts/AuthProvider";
import EventMenu from "./EventMenu";
import { useEvents } from "@/contexts/EventsProvider";

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  closed: "bg-gray-50 text-gray-500 border-gray-200",
  canceled: "bg-red-50 text-red-600 border-red-200",
};

const popularityStyles = {
  "High Popularity": "bg-amber-50 text-amber-700",
  "Medium Popularity": "bg-sky-50 text-sky-600",
  "Low Popularity": "bg-gray-50 text-gray-400",
};

const EventCard = ({ event }: { event: EventType; isAdmin?: boolean }) => {
  const eventDate = new Date(event.datetime);
  const { updateEventStatus, deleteEventById } = useEvents();
  const { isAdmin } = useAuth();

  const occupancyPct = Math.round(
    ((event.seatsAmount - event.availableSeats) / event.seatsAmount) * 100
  );

  return (
    <div className="relative bg-white w-full rounded-xl border border-gray-200 p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3 min-w-0">
          <span className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center text-lg shrink-0">
            {event.emoji}
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-semibold text-gray-900 text-base leading-tight truncate max-w-[200px]">
                {event.name}
              </h3>
              <span
                className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                  statusStyles[event.status as keyof typeof statusStyles] || statusStyles.upcoming
                }`}
              >
                {event.status}
              </span>
            </div>
            <span
              className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider mt-1 ${
                popularityStyles[event.popularity as keyof typeof popularityStyles]
              }`}
            >
              {event.popularity}
            </span>
          </div>
        </div>
        {isAdmin && (
          <EventMenu
            event={event as EventType}
            onStatusUpdate={updateEventStatus}
            onDelete={deleteEventById}
          />
        )}
      </div>

      <div className="space-y-2.5 mb-4">
        <div className="flex items-center text-sm text-gray-500">
          <MapPin className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
          <span className="truncate">{event.venue?.name || "TBD"}</span>
          {event.venue?.address?.city && (
            <span className="text-gray-400 ml-1">
              · {event.venue.address.city}, {event.venue.address.state}
            </span>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="w-3.5 h-3.5 mr-2 text-gray-400 shrink-0" />
          {eventDate.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          <Clock className="w-3.5 h-3.5 ml-3 mr-1.5 text-gray-400 shrink-0" />
          {eventDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>

      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1.5">
          <span>{occupancyPct}% occupied</span>
          <span>{event.availableSeats} of {event.seatsAmount} left</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${occupancyPct}%`,
              backgroundColor:
                occupancyPct >= 80
                  ? "#ef4444"
                  : occupancyPct >= 50
                  ? "#f59e0b"
                  : "#10b981",
            }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400">Price</span>
            <span className="text-sm font-semibold text-gray-900">
              {event?.ticketTypes?.price.toLocaleString("en-US")}
              <span className="text-xs text-gray-500 font-normal ml-0.5">EGP</span>
            </span>
          </div>
          <div className="w-px h-8 bg-gray-200" />
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Users className="w-4 h-4" />
            <span>
              {event.seatsAmount - event.availableSeats}
              <span className="text-xs text-gray-400 ml-0.5">sold</span>
            </span>
          </div>
        </div>
        <Link
          to={isAdmin ? `${event._id}` : `/event/${event._id}`}
          className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 group-hover:bg-gray-100 transition-all duration-200"
          aria-label="View event details"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
