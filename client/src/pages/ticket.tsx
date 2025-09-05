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
const TicketPage = () => {
  const ticket = {
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
    <div className="w-full  flex items-start justify-center p-4">
      <div className="bg-white rounded-xl border  max-w-1/2 w-full  overflow-y-hidden">
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
        </div>
      </div>
    </div>
  );
};

export default TicketPage;
