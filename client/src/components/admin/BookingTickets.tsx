import React, { useState, useEffect } from "react";
import {
  Search,
  User,
  CreditCard,
  MapPin,
  Calendar,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";

interface User {
  status?: string | "active" | "blocked";
  _id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
  acceptTerms: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface PaymentDetails {
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
  paymentStatus: string;
}

interface Ticket {
  paymentDetails: PaymentDetails;
  _id: string;
  event: string;
  user: string;
  ticketType: string;
  seatsNumber: string[];
  price: number;
  quantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

interface TicketData {
  user: User | null;
  ticket: Ticket;
}

const BASE_URL = import.meta.env.VITE_BASE_URL as string;

const BookingTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [filteredTickets, setFilteredTickets] = useState<TicketData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();
  const token = auth?.token as string;

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    filterTickets();
  }, [searchTerm, tickets]);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BASE_URL}/tickets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTickets(data.data as TicketData[]);
      setFilteredTickets(data.data as TicketData[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch tickets");
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    if (!searchTerm.trim()) {
      setFilteredTickets(tickets);
      return;
    }

    const searchLower = searchTerm.toLowerCase();

    const filtered = tickets.filter(
      ({ user, ticket }) =>
        user?.name?.toLowerCase().includes(searchLower) ||
        user?.email?.toLowerCase().includes(searchLower) ||
        ticket?.ticketType?.toLowerCase().includes(searchLower) ||
        ticket?.status?.toLowerCase().includes(searchLower) ||
        ticket?.seatsNumber?.some((seat) =>
          seat.toLowerCase().includes(searchLower)
        ) ||
        ticket?.paymentDetails?.cardName?.toLowerCase().includes(searchLower)
    );

    setFilteredTickets(filtered);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      completed: {
        color: "bg-green-50 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      confirmed: {
        color: "bg-green-50 text-green-700 border-green-200",
        icon: CheckCircle,
      },
      reserved: {
        color: "bg-blue-50 text-blue-700 border-blue-200",
        icon: CheckCircle,
      },
      pending: {
        color: "bg-yellow-50 text-yellow-700 border-yellow-200",
        icon: AlertCircle,
      },
      cancelled: {
        color: "bg-red-50 text-red-700 border-red-200",
        icon: XCircle,
      },
      failed: { color: "bg-red-50 text-red-700 border-red-200", icon: XCircle },
    };

    const config = statusConfig[
      status.toLowerCase() as keyof typeof statusConfig
    ] || {
      color: "bg-gray-50 text-gray-700 border-gray-200",
      icon: AlertCircle,
    };

    const Icon = config.icon;

    return (
      <div
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs font-medium ${config.color}`}
      >
        <Icon className="h-3 w-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const maskCardNumber = (cardNumber?: string) => {
    if (!cardNumber) return "**** **** **** ****";
    return cardNumber.replace(/\d(?=\d{4})/g, "*");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          Loading tickets...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <div className="flex items-center gap-2 text-sm text-red-600">
          <XCircle className="h-4 w-4" />
          Error: {error}
        </div>
        <button
          onClick={fetchTickets}
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 bg-black text-white hover:bg-black/90"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="space-y-1 ">
        <h1 className="text-2xl font-semibold tracking-tight">
          Booking Tickets
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and view all ticket bookings
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-sm bg-white border-none">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search tickets..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pl-9 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">{filteredTickets.length}</div>
          <p className="text-xs text-muted-foreground">Total Tickets</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">
            $
            {filteredTickets
              .reduce((sum, { ticket }) => sum + ticket.price, 0)
              .toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Total Revenue</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="text-2xl font-bold">
            {filteredTickets.reduce(
              (sum, { ticket }) => sum + ticket.quantity,
              0
            )}
          </div>
          <p className="text-xs text-muted-foreground">Total Seats</p>
        </div>
      </div>

      {/* Tickets */}
      {filteredTickets.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border border-dashed py-12">
          <Search className="h-10 w-10 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-semibold">No tickets found</h3>
          <p className="text-sm text-muted-foreground">
            Try adjusting your search to find what you're looking for.
          </p>
        </div>
      ) : (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredTickets.map(({ user, ticket }) => (
            <div key={ticket._id} className="rounded-lg border bg-card">
              <div className="p-6">
                {user && (
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <User className="h-4 w-4" />
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold leading-none tracking-tight">
                            {user.name}
                          </h3>
                          {user.isVerified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </div>
                    {getStatusBadge(ticket.status)}
                  </div>
                )}

                <div className="mt-6 grid gap-6 md:grid-cols-3">
                  {/* Ticket Info */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Ticket Details</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Type:</span>
                        <span className="font-medium">{ticket.ticketType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Quantity:</span>
                        <span className="font-medium">{ticket.quantity}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Price:</span>
                        <span className="font-medium">${ticket.price}</span>
                      </div>
                      <div className="space-y-1">
                        <span className="text-muted-foreground">Seats:</span>
                        <div className="flex flex-wrap gap-1">
                          {ticket.seatsNumber.map((seat, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center gap-1 rounded-md bg-muted px-2 py-1 text-xs font-medium"
                            >
                              <MapPin className="h-3 w-3" />
                              {seat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Payment
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Method:</span>
                        <span className="font-medium uppercase">
                          {ticket.paymentDetails.paymentMethod}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Status:</span>
                        {getStatusBadge(ticket.paymentDetails.paymentStatus)}
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Card:</span>
                        <span className="font-medium">
                          {maskCardNumber(ticket.paymentDetails.cardNumber)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Holder:</span>
                        <span className="font-medium">
                          {ticket.paymentDetails.cardName}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      Timeline
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Created:</span>
                        <span className="font-medium">
                          {formatDate(ticket.createdAt)}
                        </span>
                      </div>
                      {ticket.updatedAt !== ticket.createdAt && (
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Updated:
                          </span>
                          <span className="font-medium">
                            {formatDate(ticket.updatedAt)}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingTickets;
