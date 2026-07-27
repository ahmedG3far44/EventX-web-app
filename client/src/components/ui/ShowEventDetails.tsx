import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  MapPin,
  Users,
  DollarSign,
  TrendingUp,
  Ticket,
  User,
  Tag,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import type { EventType } from "@/lib/types";
import PreviewSeats from "./PreviewSeats";
import { Link } from "react-router-dom";

const statusStyles = {
  active: "bg-emerald-50 text-emerald-700 border-emerald-200",
  upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  closed: "bg-gray-100 text-gray-600 border-gray-200",
  canceled: "bg-red-50 text-red-600 border-red-200",
};

const popularityStyles = {
  "High Popularity": "bg-amber-50 text-amber-700",
  "Medium Popularity": "bg-sky-50 text-sky-600",
  "Low Popularity": "bg-gray-50 text-gray-500",
};

const ShowEventDetails = ({
  event,
  isOpen,
  setOpen,
}: {
  event: EventType;
  isOpen: boolean;
  setOpen: (open: boolean) => void;
}) => {
  const [showSeatsMap, setShowSeatsMap] = useState(false);

  const formatDate = (date: string | Date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  const formatTime = (date: string | Date) =>
    new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);

  const occupancyRate = (
    ((event.seatsAmount - event.availableSeats) / event.seatsAmount) *
    100
  ).toFixed(1);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div className="flex items-center gap-3">
                <div className="text-3xl sm:text-4xl">{event.emoji}</div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{event.name}</h1>
                  <p className="text-sm text-gray-500">{event.organizer}</p>
                </div>
              </div>
            </div>
            <Badge className={statusStyles[event.status as keyof typeof statusStyles] || statusStyles.upcoming}>
              {event.status}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-5">
              <p className="text-gray-600 leading-relaxed">{event.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{formatDate(event.datetime)}</p>
                    <p className="text-xs text-gray-500">{formatTime(event.datetime)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{event.venue?.name || "TBD"}</p>
                    {event.venue?.address?.city && (
                      <p className="text-xs text-gray-500">{event.venue.address.city}, {event.venue.address.state}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center shrink-0">
                    <User className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm truncate">{event.organizer}</p>
                    <p className="text-xs text-gray-500">Organizer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                    <Tag className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900 text-sm">{event.category}</p>
                    <p className="text-xs text-gray-500">Category</p>
                  </div>
                </div>
              </div>

              {event.tags.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Tags</p>
                    <div className="flex flex-wrap gap-1.5">
                      {event.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="capitalize text-xs">
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between flex-wrap gap-2">
                <CardTitle>Seating Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSeatsMap(!showSeatsMap)}
                  className="shrink-0"
                >
                  {showSeatsMap ? (
                    <EyeOff className="w-4 h-4 mr-1.5" />
                  ) : (
                    <Eye className="w-4 h-4 mr-1.5" />
                  )}
                  {showSeatsMap ? "Hide" : "Show"} Map
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: "Total Seats", value: event.seatsAmount, color: "text-blue-600" },
                  { label: "Occupied", value: event.seatsAmount - event.availableSeats, color: "text-emerald-600" },
                  { label: "Available", value: event.availableSeats, color: "text-amber-600" },
                  { label: "Occupancy", value: `${occupancyRate}%`, color: "text-purple-600" },
                ].map((stat) => (
                  <div key={stat.label} className="text-center p-3 rounded-lg bg-gray-50">
                    <div className={`text-xl sm:text-2xl font-bold ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(Number(occupancyRate), 100)}%`,
                    backgroundColor:
                      Number(occupancyRate) >= 80
                        ? "#ef4444"
                        : Number(occupancyRate) >= 50
                        ? "#f59e0b"
                        : "#10b981",
                  }}
                />
              </div>

              {showSeatsMap && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-sm mb-3">Seats Map</h4>
                    <PreviewSeats seats={event.seatsMap} seatSize="sm" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Revenue</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {formatCurrency(event.revenue)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Popularity</span>
                </div>
                <Badge className={popularityStyles[event.popularity] || popularityStyles["Low Popularity"]}>
                  {event.popularity}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Sold Tickets</span>
                </div>
                <span className="font-semibold text-gray-900">
                  {event.seatsAmount - event.availableSeats}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center shrink-0">
                  <Ticket className="w-5 h-5 text-indigo-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 text-sm truncate">{event.ticketTypes.name}</div>
                  <div className="text-xs text-gray-500">
                    {formatCurrency(event.ticketTypes.price)} per ticket
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Available</span>
                  <span className="font-medium text-gray-900">
                    {event.availableSeats}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Revenue</span>
                  <span className="font-medium text-emerald-600">
                    {formatCurrency(event.revenue)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Event Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Created</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(event.createdAt)}
                </div>
              </div>
              <Separator />
              <div>
                <div className="text-xs text-gray-500 mb-0.5">Last Updated</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(event.updatedAt)}
                </div>
              </div>
            </CardContent>
            {event.status === "active" || event.status === "upcoming" ? (
              <div className="px-6 pb-6">
                <Button
                  className="w-full cursor-pointer bg-green-600 hover:bg-green-700 transition-all duration-300 text-sm"
                  onClick={() => setOpen(!isOpen)}
                >
                  <Ticket className="w-4 h-4 mr-2" />
                  {isOpen ? "Cancel Booking" : "Book Tickets"}
                </Button>
              </div>
            ) : (
              <div className="px-6 pb-6">
                <Button
                  className="w-full cursor-not-allowed bg-gray-300 text-gray-500"
                  disabled
                >
                  Not Available for Booking
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowEventDetails;
