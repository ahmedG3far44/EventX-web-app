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
import { useEffect, useState } from "react";
import type { EventType } from "@/lib/types";
import QRCode from "react-qr-code";
import PreviewSeats from "../ui/PreviewSeats";

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const DOMAIN_URL = window.location.origin;

const EventDetails = () => {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [event, setEventDetails] = useState<EventType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function getEventById(id: string) {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${BASE_URL}/events/${id}`);

        if (!response.ok) {
          throw new Error("connection error check your network !!");
        }

        const data = await response.json();

        setEventDetails(data.data);
        console.log(data, "event det data:9 9999");
        return data.data;
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    }
    getEventById(id as string);
  }, [id]);

  const date = event
    ? new Date(event.datetime).toLocaleDateString()
    : "N/A Date";
  const time = event
    ? new Date(event?.datetime).toLocaleTimeString()
    : "N/A Time";

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-5 h-5 rounded-full border-r-transparent border-green-500 bg-green-100"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 rounded-2xl bg-red-200 text-red-600 border-red-600">
        <p>{error}</p>
        <Link to={"/"}>Back Home</Link>
      </div>
    );
  return (
    <>
      {event && (
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

          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            <div className="space-y-6">
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Name
                </label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                  <Edit3 className="w-5 h-5 text-gray-400" />
                  <span className="font-medium">{event?.name}</span>
                </div>
              </div>

              
              {event?.venue && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Event Venue
                  </label>
                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    <span>
                      {event.venue.name}, {event.venue.address.state},{" "}
                      {event.venue.address.city}, {event.venue.address.street}
                    </span>
                  </div>
                </div>
              )}

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Description
                </label>
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {event?.description}
                  </p>
                </div>
              </div>

              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Ticket className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Ticket Price
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    {event?.ticketTypes.price} EGP
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingCart className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Seat Amount
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    {event?.seatsAmount}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <UserCheck className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Available Seats
                    </span>
                  </div>
                  <span className="text-lg font-bold">
                    {event?.availableSeats}
                  </span>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg border">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Popularity
                    </span>
                  </div>
                  <span className="text-sm font-medium text-green-600">
                    {event?.popularity}
                  </span>
                </div>

                <div className="p-6 w-full flex items-center justify-center flex-col gap-2 bg-gray-50 rounded-lg border text-center">
                  <QRCode
                    width={400}
                    height={400}
                    bgColor="#ffff"
                    value={`${DOMAIN_URL}/checkout/${event?._id}`}
                  />
                  <p className="text-sm text-gray-600">
                    Scan QR code for easy payments
                  </p>
                </div>
              </div>
            </div>

            
            <div className="space-y-6">
          
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Date
                </label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <span>{date}</span>
                </div>
              </div>

              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Time
                </label>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border">
                  <Clock className="w-5 h-5 text-gray-400" />
                  <span>{time}</span>
                </div>
              </div>

              <PreviewSeats seats={event.seatsMap} />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tags
                  </label>

                  <div className="p-4 bg-gray-50 rounded-lg border">
                    <div className="flex flex-wrap gap-2">
                      {event?.tags.map((tag, index) => (
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
                    <span className="font-medium">
                      +{event?.seatsAmount - 0.3}
                    </span>
                  </div>
                </div>
              </div>

              
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
      )}
    </>
  );
};

export default EventDetails;
