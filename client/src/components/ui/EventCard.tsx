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
import { useState } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { useAuth } from "@/contexts/AuthProvider";

const EventCard = ({ event }: { event: EventType; isAdmin?: boolean }) => {
  const eventTime = new Date(event.datetime);
  const eventDate = new Date(event.datetime);

  // const formatCurrency = (amount: number) => {
  //   return `${amount.toString()} EGP`;
  // };

  const [openMenu, setOpenMenu] = useState(false);
  const { isAdmin } = useAuth();
  return (
    <div className="relative bg-white w-full rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-start gap-2 mb-3">
        <span className="w-5 h-5">{event.emoji}</span>
        <h3 className="font-semibold text-gray-900 text-lg">{event.name}</h3>
        {isAdmin && (
          <button
            onClick={() => setOpenMenu(!openMenu)}
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>
        )}
      </div>
      {openMenu && <ActionMenu setOpenMenu={setOpenMenu} />}
      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin className="w-4 h-4 mr-2 text-gray-400 " />
          Venue: {event.venue && event.name}
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
            {event?.ticketTypes?.price.toLocaleString()} EGP
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
          to={isAdmin ? `${event._id}` : `/event/${event._id}`}
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

function ActionMenu({ setOpenMenu }: { setOpenMenu: (open: boolean) => void }) {
  return (
    <Card className="w-40 p-4 border rounded-2xl shadow-2xl z-50 flex flex-col justify-center items-center gap-2 absolute top-0 right-0">
      <Button className="w-full px-4 py-2 rounded-md hover:opacity-65  cursor-pointer duration-300">
        update
      </Button>
      <Button className="w-full px-4 py-2 rounded-md hover:opacity-65  cursor-pointer duration-300">
        delete
      </Button>
      <Button
        onClick={() => setOpenMenu(false)}
        className="w-full px-4 py-2 rounded-md hover:opacity-65 duration-300 cursor-pointer "
      >
        close
      </Button>
    </Card>
  );
}
