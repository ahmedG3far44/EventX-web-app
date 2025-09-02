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
import { Link, useNavigate, useParams } from "react-router-dom";
import Seats from "../ui/Seats";
import { useEvents } from "@/contexts/EventsProvider";
import { useEffect, useState } from "react";
import type { EventType } from "@/lib/types";
import QRCode from "react-qr-code";

const DOMAIN_URL = import.meta.env.VITE_DOMAIN_URL as string;

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getEventById, eventDetails,  loading } = useEvents();
  const [data, setEventData] = useState<EventType>(eventDetails);

  console.log(id)

  useEffect(() => {
    (async () => {
      const event = await getEventById(id as string);
      console.log(event, "data event")
      setEventData(event as EventType);
    })();
  }, []);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-5 h-5 rounded-full border-r-transparent border-green-500 bg-green-100"></div>
      </div>
    );

  return (
    <div className="w-full min-h-screen p-4 mx-auto bg-white">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate(-1)}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
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
              <span className="font-medium">{data?.name}</span>
            </div>
          </div>

          {/* Event Venue */}
          {data?.venue && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Event Venue
              </label>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span>
                  {data.venue.name}, {data.venue.address.state},{" "}
                  {data.venue.address.city}, {data.venue.address.street}
                </span>
              </div>
            </div>
          )}

          {/* Event Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Description
            </label>
            <div className="p-4 bg-gray-50 rounded-lg border">
              <p className="text-sm text-gray-700 leading-relaxed">
                {data?.description}
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
                {data?.ticketTypes.price} EGP
              </span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Seat Amount
                </span>
              </div>
              <span className="text-lg font-bold">{data?.seatsAmount}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <UserCheck className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Available Seats
                </span>
              </div>
              <span className="text-lg font-bold">{data?.availableSeats}</span>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg border">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  Popularity
                </span>
              </div>
              <span className="text-sm font-medium text-green-600">
                {data?.popularity}
              </span>
            </div>

            <div className="p-6 w-full flex items-center justify-center flex-col gap-2 bg-gray-50 rounded-lg border text-center">
              <QRCode
                width={400}
                height={400}
                bgColor="#ffff"
                value={`${DOMAIN_URL}/checkout/${data?._id}`}
              />
              <p className="text-sm text-gray-600">
                Scan QR code for easy payments
              </p>
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
              <span>{new Date(data?.datetime).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Event Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Event Time
            </label>
            <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
              <Clock className="w-5 h-5 text-gray-400" />
              <span>{new Date(data?.datetime).toLocaleTimeString()}</span>
            </div>
          </div>

          <Seats
            editState={true}
            seatsMap={data?.seatsMap}
            event={data as EventType}
          />
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
                <span className="font-medium">+{data.seatsAmount - 0.3}</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-medium py-3 px-6 rounded-lg transition-colors">
              EDIT
            </button>
            <Link
              to={`/dashboard/attendee-insights/${id}`}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <BarChart3 className="w-5 h-5" />
              Attendee Insights
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
