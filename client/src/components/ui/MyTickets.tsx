import React, { useState, useEffect } from "react";
import {
  Ticket,
  Calendar,
  MapPin,
  CreditCard,
  Users,
  Clock,
  AlertCircle,
  Loader2,
  CheckCircle,
  X,
  Eye,
} from "lucide-react";
import { env } from "configs/env";
import { useAuth } from "@/contexts/AuthProvider";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";
import { Button } from "./button";

interface PaymentDetails {
  paymentMethod: string;
  paymentStatus: "pending" | "completed" | "failed" | "refunded";
}

interface TicketData {
  _id: string;
  event: string;
  user: string;
  ticketType: "general" | "vip";
  seatsNumber: string[];
  price: number;
  quantity: number;
  status: "reserved" | "paid";
  paymentDetails: PaymentDetails;
  qrCode?: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface ApiResponse {
  data: TicketData[];
  success: boolean;
  message: string;
}

const BASE_URL = env.BASE_URL;

const statusBadge = (status: string) => {
  switch (status) {
    case "paid": return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "reserved": return "bg-amber-50 text-amber-700 border-amber-200";
    default: return "bg-gray-50 text-gray-600 border-gray-200";
  }
};

const TicketInfoDetails: React.FC<{ ticket: TicketData; onClose: () => void }> = ({
  ticket,
  onClose,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

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

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Ticket className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-gray-900">Ticket Details</h2>
              <p className="text-xs text-gray-500 font-mono">
                #{ticket._id.slice(-12).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div className="flex flex-wrap gap-2">
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
              ticket.ticketType === "vip"
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-blue-50 text-blue-700 border-blue-200"
            }`}>
              {ticket.ticketType.toUpperCase()}
            </span>
            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusBadge(ticket.status)}`}>
              {ticket.status.toUpperCase()}
            </span>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-gray-50 rounded-xl border border-gray-100">
              <QRCode
                size={200}
                style={{ height: "auto", maxWidth: "160px", width: "100%" }}
                viewBox="0 0 256 256"
                value={`${window.location.origin}/tickets/${ticket._id}`}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">Scan for ticket validation</p>
          </div>

          <div className="grid sm:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Event Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-500">Event:</span>
                    <span className="text-sm font-medium text-gray-900 font-mono">
                      #{ticket.event.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-500">Purchased:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Seating</h3>
                <div className="flex flex-wrap gap-1.5">
                  {ticket.seatsNumber.map((seat, index) => {
                    const isReserved = ticket.paymentDetails?.paymentMethod === "reserved";
                    return (
                      <div
                        key={index}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs ${
                          isReserved ? "bg-amber-50" : "bg-emerald-50"
                        }`}
                      >
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="font-medium text-gray-900">{seat}</span>
                        <span className={`text-[10px] font-semibold px-1 py-0.5 rounded ${
                          isReserved ? "bg-amber-200 text-amber-800" : "bg-emerald-200 text-emerald-800"
                        }`}>
                          {isReserved ? "RSV" : "PAID"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Purchase Details</h3>
                <div className="bg-gray-50 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Qty:</span>
                    <div className="flex items-center gap-1">
                      <Users className="w-3.5 h-3.5 text-gray-400" />
                      <span className="font-medium text-gray-900 text-sm">{ticket.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Price:</span>
                    <span className="text-sm font-medium text-gray-900">
                      {ticket.price.toLocaleString()}
                      <span className="text-xs text-gray-500 ml-0.5">EGP</span>
                    </span>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-gray-900">Total:</span>
                      <span className="text-sm font-bold text-blue-600">
                        {(ticket.price * ticket.quantity).toLocaleString()}
                        <span className="text-xs ml-0.5">EGP</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">Payment</h3>
                <div className="bg-gray-50 rounded-lg p-3.5 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Status:</span>
                    <div className="flex items-center gap-1.5">
                      {getStatusIcon(ticket.paymentDetails.paymentStatus)}
                      <span className="text-sm font-medium capitalize text-gray-900">
                        {ticket.paymentDetails.paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">Method:</span>
                    <div className="flex items-center gap-1">
                      <CreditCard className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-sm font-medium capitalize text-gray-900">
                        {ticket.paymentDetails.paymentMethod}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-4 border-t border-gray-100">
            <Link
              to={`/tickets/${ticket._id}`}
              className="flex-1 text-center bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Open Ticket Page
            </Link>
            <button
              onClick={() => {
                const link = document.createElement("a");
                link.href = `/tickets/${ticket._id}`;
                link.download = `ticket-${ticket._id}.png`;
                link.click();
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Download QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border border-gray-100 overflow-hidden animate-pulse">
    <div className="p-5 border-b border-gray-50">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-100 rounded" />
          <div className="h-4 bg-gray-100 rounded w-20" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-5 bg-gray-50 rounded-full w-14" />
          <div className="h-5 bg-gray-50 rounded-full w-14" />
        </div>
      </div>
      <div className="h-5 bg-gray-100 rounded w-32" />
    </div>
    <div className="p-5 space-y-3">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="w-5 h-5 bg-gray-50 rounded shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 bg-gray-100 rounded w-24" />
            <div className="h-3 bg-gray-50 rounded w-32" />
          </div>
        </div>
      ))}
    </div>
    <div className="px-5 py-4 bg-gray-50 border-t border-gray-50">
      <div className="h-9 bg-gray-100 rounded-lg" />
    </div>
  </div>
);

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const { token, user } = useAuth();

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleViewDetails = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setShowDetails(true);
  };

  const handleCloseDetails = () => {
    setShowDetails(false);
    setSelectedTicket(null);
  };

  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${BASE_URL}/tickets/my/${user?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result: ApiResponse = await response.json();

      if (result.success) {
        setTickets(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch tickets");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const getTicketTypeColor = (type: string) =>
    type === "vip"
      ? "bg-purple-50 text-purple-700 border-purple-200"
      : "bg-blue-50 text-blue-700 border-blue-200";

  if (loading) {
    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8 animate-pulse">
            <div className="h-8 bg-gray-100 rounded w-40 mb-2" />
            <div className="h-4 bg-gray-50 rounded w-64" />
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </main>
    );
  }

  return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">My Tickets</h1>
          <p className="text-sm text-gray-500">Manage and view all your purchased tickets</p>

          {error && (
            <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-amber-800 font-medium text-sm">Connection Error</p>
                <p className="text-amber-700 text-xs mt-0.5">{error}</p>
              </div>
              <button
                onClick={fetchTickets}
                className="shrink-0 text-amber-700 hover:text-amber-800 text-xs font-medium underline cursor-pointer"
              >
                Retry
              </button>
            </div>
          )}
        </div>

        {tickets.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-200 mb-4">
              <Ticket className="w-16 h-16 mx-auto" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No tickets found</h2>
            <p className="text-gray-500 text-sm mb-6">You haven't purchased any tickets yet.</p>
            <Link to="/">
              <Button className="bg-green-600 hover:bg-green-700 text-white">
                Browse Events
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {tickets.map((ticket) => (
                <div
                  key={ticket._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300 overflow-hidden group"
                >
                  <div className="p-5 border-b border-gray-100">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <Ticket className="w-4 h-4 text-blue-600" />
                        <span className="text-xs font-medium text-gray-500 font-mono">
                          #{ticket._id.slice(-8).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${getTicketTypeColor(ticket.ticketType)}`}>
                          {ticket.ticketType.toUpperCase()}
                        </span>
                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-full border ${statusBadge(ticket.status)}`}>
                          {ticket.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900 font-mono">
                      Event #{ticket.event.slice(-8).toUpperCase()}
                    </h3>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs font-medium text-gray-900 mb-1">Seats</p>
                        <div className="flex flex-wrap gap-1">
                          {ticket.seatsNumber.map((seat, index) => {
                            const isReserved = ticket.paymentDetails?.paymentMethod === "reserved";
                            return (
                              <span
                                key={index}
                                className={`inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-medium rounded ${
                                  isReserved ? "bg-amber-50 text-amber-800" : "bg-emerald-50 text-emerald-800"
                                }`}
                              >
                                {seat}
                                <span className="opacity-50">|</span>
                                {isReserved ? "RSV" : "PAID"}
                              </span>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Users className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">
                          {ticket.quantity} {ticket.quantity === 1 ? "Ticket" : "Tickets"}
                        </p>
                        <p className="text-xs text-gray-500">
                          {ticket.price.toLocaleString()}
                          <span className="text-[10px] ml-0.5">EGP</span>
                          {" × "}
                          {ticket.quantity}
                          {" = "}
                          <span className="font-medium text-gray-700">
                            {(ticket.price * ticket.quantity).toLocaleString()}
                            <span className="text-[10px] ml-0.5">EGP</span>
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Calendar className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-xs font-medium text-gray-900">Purchased</p>
                        <p className="text-xs text-gray-500">{formatDate(ticket.createdAt)}</p>
                      </div>
                    </div>
                  </div>

                  <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleViewDetails(ticket)}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-3 rounded-lg transition-colors duration-200 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        View Details
                      </button>
                      <Link
                        to={`/tickets/${ticket._id}`}
                        className="flex items-center justify-center bg-white hover:bg-gray-100 text-gray-600 text-xs font-medium py-2 px-3 rounded-lg border border-gray-200 transition-colors duration-200"
                      >
                        Open
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <button
                onClick={fetchTickets}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 cursor-pointer"
              >
                <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </button>
            </div>
          </>
        )}

        {showDetails && selectedTicket && (
          <TicketInfoDetails
            ticket={selectedTicket}
            onClose={handleCloseDetails}
          />
        )}
      </main>
  );
};

export default MyTickets;