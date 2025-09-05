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
  XCircle,
  QrCode,
  Eye,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthProvider";
import Spinner from "./Spinner";
import QRCode from "react-qr-code";
import { Link } from "react-router-dom";


interface PaymentDetails {
  paymentMethod: string;
  cardName: string;
  cardNumber: string;
  expiryDate: string;
  cvc: string;
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

const BASE_URL = import.meta.env.VITE_BASE_URL as string;
const DOMAIN_URL = window.location.origin;
export interface TicketInfoDetailsProps {
  ticket: TicketData;
  onClose: () => void;
}

const TicketInfoDetails: React.FC<TicketInfoDetailsProps> = ({
  ticket,
  onClose,
}) => {
  const generateQRCode = (ticketId: string) => {
    const ticketUrl = `http://localhost:3000/ticket/${ticketId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
      ticketUrl
    )}`;
  };

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
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">

        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Ticket className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Ticket Details
              </h2>
              <p className="text-sm text-gray-500">
                #{ticket._id.slice(-12).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XCircle className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-6 space-y-6">

          <div className="flex flex-wrap gap-2">
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                ticket.ticketType === "vip"
                  ? "bg-purple-100 text-purple-800"
                  : "bg-blue-100 text-blue-800"
              }`}
            >
              {ticket.ticketType.toUpperCase()} Ticket
            </span>
            <span
              className={`px-3 py-1 text-sm font-medium rounded-full ${
                ticket.status === "paid"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {ticket.status.toUpperCase()}
            </span>
          </div>

          <div className="text-center">
            <div className="inline-block p-4 bg-gray-50 rounded-xl border ">
              <QRCode
                size={256}
                style={{ height: "auto", maxWidth: "200px", width: "150px" }}
                viewBox={`0 0 256 256`}
                value={`${window.location.origin}/tickets/${ticket._id}`}
              />
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Scan this QR code for ticket validation
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Event Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Event ID:</span>
                    <span className="text-sm font-medium">
                      #{ticket.event.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Purchased:</span>
                    <span className="text-sm font-medium">
                      {formatDate(ticket.createdAt)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Seating</h3>
                <div className="flex flex-wrap gap-2">
                  {ticket.seatsNumber.map((seat, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg"
                    >
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span className="font-medium text-gray-900">{seat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Purchase Details
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Quantity:</span>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="font-medium">{ticket.quantity}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">
                      Price per ticket:
                    </span>
                    <span className="font-medium">${ticket.price}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-semibold text-gray-900">
                      Total Amount:
                    </span>
                    <span className="font-bold text-blue-600">
                      ${ticket.price * ticket.quantity}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">
                  Payment Information
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Status:</span>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(ticket.paymentDetails.paymentStatus)}
                      <span className="text-sm font-medium capitalize">
                        {ticket.paymentDetails.paymentStatus}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Method:</span>
                    <div className="flex items-center space-x-1">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-sm font-medium capitalize">
                        {ticket.paymentDetails.paymentMethod}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Cardholder:</span>
                    <span className="text-sm font-medium">
                      {ticket.paymentDetails.cardName}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Card:</span>
                    <span className="text-sm font-medium">
                      •••• {ticket.paymentDetails.cardNumber.slice(-4)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex space-x-3 pt-4 border-t border-gray-200">
            <Link
              to={`http://localhost:3000/tickets/${ticket._id}`}
              target="_blank"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-center text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Open Ticket Page
            </Link>
            <button
              onClick={() => {
                const qrUrl = ticket.qrCode || generateQRCode(ticket._id);
                const link = document.createElement("a");
                link.href = qrUrl;
                link.download = `ticket-${ticket._id}.png`;
                link.click();
              }}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Download QR
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyTickets: React.FC = () => {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const { token, user } = useAuth();

  const dummyData: TicketData[] = [
    {
      _id: "68b5f8cf462c2920bf464725",
      event: "68b5f72ae5dc6890b5e34e07",
      user: "68a334ca1441b9f5d8c6666e",
      ticketType: "vip",
      seatsNumber: ["A-4", "B-2"],
      price: 100,
      quantity: 2,
      status: "reserved",
      qrCode: `http://localhost:3000/ticket/68b5f8cf462c2920bf464725`,
      paymentDetails: {
        paymentMethod: "card",
        cardName: "G3far Kamal",
        cardNumber: "4848-4848-4848-4848",
        expiryDate: "08/29",
        cvc: "433",
        paymentStatus: "completed",
      },
      createdAt: "2025-09-01T19:49:35.465Z",
      updatedAt: "2025-09-01T19:49:35.465Z",
      __v: 0,
    },
    {
      _id: "68b5f8d5462c2920bf464728",
      event: "68b5f72ae5dc6890b5e34e07",
      user: "68a334ca1441b9f5d8c6666e",
      ticketType: "general",
      seatsNumber: ["C-1", "C-2", "C-3"],
      price: 50,
      quantity: 3,
      status: "paid",
      qrCode: `http://localhost:3000/ticket/68b5f8d5462c2920bf464728`,
      paymentDetails: {
        paymentMethod: "card",
        cardName: "G3far Kamal",
        cardNumber: "4848-4848-4848-4848",
        expiryDate: "08/29",
        cvc: "433",
        paymentStatus: "completed",
      },
      createdAt: "2025-09-01T19:49:41.245Z",
      updatedAt: "2025-09-01T19:49:41.245Z",
      __v: 0,
    },
  ];

  useEffect(() => {
    fetchTickets();
  }, []);

  const generateQRCode = (ticketId: string) => {
    const ticketUrl = `${DOMAIN_URL}/ticket/${ticketId}`;
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
      ticketUrl
    )}`;
  };

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

      const response = await fetch(`${BASE_URL}/tickets/${user?._id}`, {
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
      console.error("Error fetching tickets:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
      setTickets(dummyData);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const getTicketTypeColor = (type: string) => {
    return type === "vip"
      ? "bg-purple-100 text-purple-800 border-purple-200"
      : "bg-blue-100 text-blue-800 border-blue-200";
  };

  const getStatusColor = (status: string) => {
    return status === "paid"
      ? "bg-green-100 text-green-800 border-green-200"
      : "bg-yellow-100 text-yellow-800 border-yellow-200";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex flex-col gap-4 items-center ">
          <Spinner />
          <h4>Loading your tickets...</h4>
        </div>
      </div>
    );
  }

  const ticketsWithQR = tickets.map((ticket) => ({
    ...ticket,
    qrCode: ticket.qrCode || generateQRCode(ticket._id),
  }));

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Tickets</h1>
        <p className="text-gray-600">
          Manage and view all your purchased tickets
        </p>

        {error && (
          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-yellow-800 font-medium">Connection Error</p>
              <p className="text-yellow-700 text-sm">
                {error}. Showing demo data instead.
              </p>
            </div>
          </div>
        )}
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-12">
          <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No tickets found
          </h2>
          <p className="text-gray-600">
            You haven't purchased any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {ticketsWithQR.map((ticket) => (
            <div
              key={ticket._id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Ticket className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-500">
                      #{ticket._id.slice(-8).toUpperCase()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getTicketTypeColor(
                        ticket.ticketType
                      )}`}
                    >
                      {ticket.ticketType.toUpperCase()}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(
                        ticket.status
                      )}`}
                    >
                      {ticket.status.toUpperCase()}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Event #{ticket.event.slice(-8).toUpperCase()}
                </h3>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">Seats</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {ticket.seatsNumber.map((seat, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded"
                        >
                          {seat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {ticket.quantity}{" "}
                      {ticket.quantity === 1 ? "Ticket" : "Tickets"}
                    </p>
                    <p className="text-sm text-gray-600">
                      ${ticket.price} × {ticket.quantity} = $
                      {ticket.price * ticket.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Purchased
                    </p>
                    <p className="text-sm text-gray-600">
                      {formatDate(ticket.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleViewDetails(ticket)}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                  <Link
                    to={`${window.location.origin}/tickets/${ticket._id}`}
                    target="_blank"
                    className="flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-3 rounded-lg transition-colors duration-200"
                  >
                    <QrCode className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {tickets.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={fetchTickets}
            disabled={loading}
            className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium rounded-lg transition-colors duration-200 disabled:opacity-50"
          >
            <Loader2 className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            <span>Refresh</span>
          </button>
        </div>
      )}
      {showDetails && selectedTicket && (
        <TicketInfoDetails
          ticket={selectedTicket}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  );
};

export default MyTickets;
