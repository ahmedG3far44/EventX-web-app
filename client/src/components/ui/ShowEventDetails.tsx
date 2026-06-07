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
  Share2,
  Eye,
  EyeOff,
} from "lucide-react";
import type { EventType } from "@/lib/types";
import PreviewSeats from "./PreviewSeats";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "upcoming":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "canceled":
        return "bg-red-100 text-red-800 border-red-200";
      case "closed":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPopularityColor = (popularity: string) => {
    if (popularity.toLowerCase().includes("high")) {
      return "bg-red-100 text-red-800 border-red-200";
    } else if (popularity.toLowerCase().includes("medium")) {
      return "bg-orange-100 text-orange-800 border-orange-200";
    } else {
      return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  const occupancyRate = (
    ((event.seatsAmount - event.availableSeats) / event.seatsAmount) *
    100
  ).toFixed(1);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Button onClick={() => navigate(-1)} variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="text-4xl">{event.emoji}</div>
                <div>
                  <h1 className="text-2xl font-bold">{event.name}</h1>
                  <p className="text-sm text-gray-500">ID: {event._id}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(event.status)}>
                {event.status}
              </Badge>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Event Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600">{event.description}</p>
              </div>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">
                      {formatDate(event.datetime.toString())}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatTime(event.datetime.toString())}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="font-medium">
                      {event.venue && event.venue.name}
                    </p>
                    <p className="text-sm text-gray-500">Event Venue</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium">{event.organizer}</p>
                    <p className="text-sm text-gray-500">Organizer</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="font-medium">{event.category}</p>
                    <p className="text-sm text-gray-500">Category</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Seating Information</CardTitle>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSeatsMap(!showSeatsMap)}
                >
                  {showSeatsMap ? (
                    <EyeOff className="w-4 h-4 mr-2" />
                  ) : (
                    <Eye className="w-4 h-4 mr-2" />
                  )}
                  {showSeatsMap ? "Hide" : "Show"} Seats Map
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {event.seatsAmount}
                  </div>
                  <div className="text-sm text-gray-500">Total Seats</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {event.seatsAmount - event.availableSeats}
                  </div>
                  <div className="text-sm text-gray-500">Occupied</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {event.availableSeats}
                  </div>
                  <div className="text-sm text-gray-500">Available</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {occupancyRate}%
                  </div>
                  <div className="text-sm text-gray-500">Occupancy</div>
                </div>
              </div>

              {showSeatsMap && (
                <>
                  <Separator />
                  <div>
                    <h4 className="font-medium mb-3">Seats Map</h4>
                    <PreviewSeats seats={event.seatsMap} seatSize="sm" />
                  </div>
                </>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="capitalize">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm">Revenue</span>
                </div>
                <span className="font-semibold text-green-600">
                  {formatCurrency(event.revenue)}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-600" />
                  <span className="text-sm">Popularity</span>
                </div>
                <Badge className={getPopularityColor(event.popularity)}>
                  {event.popularity}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-600" />
                  <span className="text-sm">Sold Tickets</span>
                </div>
                <span className="font-semibold">
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
                <Ticket className="w-5 h-5 text-indigo-600" />
                <div className="flex-1">
                  <div className="font-medium">{event.ticketTypes.name}</div>
                  <div className="text-sm text-gray-500">
                    {formatCurrency(event.ticketTypes.price)} per ticket
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Available</span>
                  <span className="font-medium">
                    {event.ticketTypes.available}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total Revenue</span>
                  <span className="font-medium text-green-600">
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
                <div className="text-sm text-gray-500 mb-1">Created</div>
                <div className="text-sm font-medium">
                  {formatDate(new Date(event.createdAt).toLocaleDateString())}
                </div>
              </div>

              <Separator />

              <div>
                <div className="text-sm text-gray-500 mb-1">Last Updated</div>
                <div className="text-sm font-medium">
                  {formatDate(new Date(event.updatedAt).toLocaleDateString())}
                </div>
              </div>
            </CardContent>
            {event.status === "active" || event.status === "upcoming" ? (
              <Button
                className="w-[80%] mx-auto cursor-pointer bg-green-600 hover:bg-green-700 duration-300"
                onClick={() => setOpen(!isOpen)}
              >
                {isOpen ? "Cancel Booking" : "Book Tickets"}
              </Button>
            ) : (
              <Button
                className="w-[80%] disabled:bg-zinc-400 disabled:cursor-not-allowed mx-auto cursor-pointer bg-zinc-600 duration-300"
                disabled
              >
                No Available For Book
              </Button>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShowEventDetails;
