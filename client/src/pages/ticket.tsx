import { useState, useEffect } from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  CreditCard,
  MapPin,
  Ticket,
  Users,
  XCircle,
} from "lucide-react";
import QRCode from "react-qr-code";
import { env } from "configs/env";
import { useParams } from "react-router-dom";
import { useAuth } from "@/contexts/AuthProvider";

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
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !ticket) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="text-center">
          <p className="text-red-500">Failed to load ticket: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex items-start justify-center p-4">
      <div className="bg-white rounded-xl border max-w-1/2 w-full overflow-y-hidden">
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
                  {ticket.seatsNumber.map((seat, index) => {
                    const isReserved = ticket.paymentDetails?.paymentMethod === "reserved";
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg"
                        style={{
                          backgroundColor: isReserved ? "#fef3c7" : "#d1fae5",
                        }}
                      >
                        <MapPin className="w-4 h-4 text-gray-500" />
                        <span className="font-medium text-gray-900">{seat}</span>
                        <span
                          className={`text-xs font-medium px-1.5 py-0.5 rounded ${
                            isReserved
                              ? "bg-yellow-200 text-yellow-800"
                              : "bg-green-200 text-green-800"
                          }`}
                        >
                          {isReserved ? "RESERVED" : "PAID"}
                        </span>
                      </div>
                    );
                  })}
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPage;