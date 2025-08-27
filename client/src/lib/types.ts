export interface EventType {
  _id?: string;
  name: string;
  description: string;
  category: string;
  venue: EventLocationType;
  datetime: Date;
  organizer: string;
  emoji: string;
  seatsAmount: number;
  availableSeats: number;
  seatsMap: number[][];
  revenue: number;
  popularity: "High Popularity" | "Medium Popularity" | "Low Popularity";
  ticketTypes: TicketType;
  status: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface TicketType {
  _id?: string;
  name: string;
  price: number;
  available: number;
}
export interface EventLocationType {
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  capacity: number;
}

export interface EventCategoryType {
  _id?: string;
  name: string;
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  capacity: number;
}

export interface UserTicketInfoType {
  _id?: string;
  ticketNumber: number;
  event: string;
  user: string;
  ticketType: string;
  seatNumber: string;
  price: number;
  status: "canceled" | "confirmed" | "pending" | "booked";
  qrCode: string;
  paymentDetails: PaymentDetailsType;
  bookingDate: Date;
  checkInTime: null;
  //   isTransferable: true;
  //   transferHistory?: [];
  //   specialRequests: "Vegetarian meal preference";
  createdAt: Date;
  updatedAt: Date;
}

export interface PaymentDetailsType {
  paymentId: string;
  paymentMethod: "cash" | "debit_card" | "paypal" | "strip";
  transactionId: string;
  paymentStatus: "completed";
  paidAt: Date;
}

export interface CategoryType {
  _id?: string;
  name: string;
  description: string;
  isActive: true;
  createdAt: Date;
  updatedAt: Date;
}
