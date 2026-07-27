import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Ticket,
  Users,
  X,
  ArrowLeft,
} from "lucide-react";
import QRCode from "react-qr-code";
import { env } from "configs/env";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";
import { Button } from "@/components/ui/button";

const BASE_URL = env.BASE_URL;

interface TicketData {
  _id: string;
  event: string;
  user: string;
  ticketType: string;
  seatsNumber: string[];
  price: number;
  quantity: number;
  status: string;
  qrCode?: string;
  paymentDetails: {
    paymentMethod: string;
    paymentStatus: string;
  };
  createdAt: string;
  updatedAt: string;
}

const SkeletonTicket = () => (
  <div className="max-w-2xl mx-auto p-4 animate-pulse">
    <div className="rounded-xl border border-gray-100 bg-white">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-100 rounded-lg" />
          <div className="space-y-2">
            <div className="h-5 bg-gray-100 rounded w-40" />
            <div className="h-4 bg-gray-50 rounded w-24" />
          </div>
        </div>
      </div>
      <div className="p-6 space-y-6">
        <div className="flex justify-center">
          <div className="w-40 h-40 bg-gray-50 rounded-xl" />
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-3">
              <div className="h-4 bg-gray-100 rounded w-28" />
              <div className="space-y-2">
                {[1, 2, 3].map((j) => (
                  <div key={j} className="h-4 bg-gray-50 rounded w-full" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const TicketPage = () => {
  const { ticketId } = useParams();
  const { token } = useAuth();
  const [ticket, setTicket] = useState<TicketData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch ticket");
        }
        const data = await response.json();
        setTicket(data.data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };
    if (ticketId && token) {
      fetchTicket();
    }
  }, [ticketId, token]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "failed":
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
        <SkeletonTicket />
    );
  }

  if (error || !ticket) {
    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
          <div className="text-center max-w-md">
            <div className="rounded-full bg-red-50 p-4 w-fit mx-auto mb-4">
              <X className="w-8 h-8 text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load ticket</h2>
            <p className="text-sm text-gray-500 mb-6">{error || "Ticket not found"}</p>
            <Link to="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Events
              </Button>
            </Link>
          </div>
        </div>
    );
  }

  const statusBadge = (status: string) => {
    switch (status) {
      case "paid": return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "reserved": return "bg-amber-50 text-amber-700 border-amber-200";
      default: return "bg-gray-50 text-gray-600 border-gray-200";
    }
  };

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto">
          <Link to="/tickets" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1.5" />
            Back to My Tickets
          </Link>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-blue-50 rounded-lg">
                  <Ticket className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Ticket Details</h2>
                  <p className="text-xs text-gray-500 font-mono">
                    #{ticket._id.slice(-12).toUpperCase()}
                  </p>
                </div>
              </div>
              <span className={`px-3 py-1 text-xs font-medium rounded-full border ${statusBadge(ticket.status)}`}>
                {ticket.status.toUpperCase()}
              </span>
            </div>

            <div className="p-6 space-y-6">
              <div className="flex flex-wrap gap-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                  ticket.ticketType === "vip"
                    ? "bg-purple-50 text-purple-700 border border-purple-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                  {ticket.ticketType.toUpperCase()}
                </span>
              </div>

              <div className="text-center">
                <div className="inline-block p-5 bg-gray-50 rounded-xl border border-gray-100">
                  <QRCode
                    size={200}
                    style={{ height: "auto", maxWidth: "180px", width: "100%" }}
                    viewBox="0 0 256 256"
                    value={`${window.location.origin}/tickets/${ticket._id}`}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-3">
                  Scan for ticket validation
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Event Information</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2.5">
                        <Ticket className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-sm text-gray-500">Event:</span>
                        <span className="text-sm font-medium text-gray-900 font-mono">
                          #{ticket.event.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                        <span className="text-sm text-gray-500">Purchased:</span>
                        <span className="text-sm font-medium text-gray-900">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Seating</h3>
                    <div className="flex flex-wrap gap-2">
                      {ticket.seatsNumber.map((seat, index) => {
                        const isReserved = ticket.paymentDetails?.paymentMethod === "reserved";
                        return (
                          <div
                            key={index}
                            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg ${
                              isReserved ? "bg-amber-50" : "bg-emerald-50"
                            }`}
                          >
                            <MapPin className="w-3.5 h-3.5 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900">{seat}</span>
                            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${
                              isReserved ? "bg-amber-200 text-amber-800" : "bg-emerald-200 text-emerald-800"
                            }`}>
                              {isReserved ? "RESERVED" : "PAID"}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Purchase Details</h3>
                    <div className="space-y-3 bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Quantity:</span>
                        <div className="flex items-center gap-1.5">
                          <Users className="w-4 h-4 text-gray-400" />
                          <span className="font-medium text-gray-900">{ticket.quantity}</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Price per ticket:</span>
                        <span className="font-medium text-gray-900">
                          {ticket.price.toLocaleString()}
                          <span className="text-xs text-gray-500 ml-0.5">EGP</span>
                        </span>
                      </div>
                      <div className="pt-2 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-900">Total Amount:</span>
                          <span className="font-bold text-blue-600">
                            {(ticket.price * ticket.quantity).toLocaleString()}
                            <span className="text-xs ml-0.5">EGP</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Payment Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Status:</span>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(ticket.paymentDetails.paymentStatus)}
                          <span className="text-sm font-medium capitalize text-gray-900">
                            {ticket.paymentDetails.paymentStatus}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Method:</span>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4 text-gray-400" />
                          <span className="text-sm font-medium capitalize text-gray-900">
                            {ticket.paymentDetails.paymentMethod}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
};

export default TicketPage;