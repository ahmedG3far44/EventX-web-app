import { Schema, model } from "mongoose";
const ticketSchema = new Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["general", "vip"],
      required: true,
    },
    seatNumber: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      enum: ["booked", "confirmed", "checked-in", "cancelled", "refunded"],
      default: "booked",
    },
    qrCode: {
      type: String,
      required: true,
    },
    paymentDetails: {
      paymentId: { type: String },
      paymentMethod: {
        type: String,
        enum: ["credit-card", "debit-card", "paypal", "stripe"],
      },
      transactionId: { type: String },
      paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "pending",
      }
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    checkInTime: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
const Ticket = model("tickets", ticketSchema);

export default Ticket;
