import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    ticketNumber: {
      type: String,
      required: true,
      unique: true,
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["general", "vip", "student"],
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
      },
      paidAt: { type: Date },
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    checkInTime: {
      type: Date,
    },
    isTransferable: {
      type: Boolean,
      default: false,
    },
    transferHistory: [
      {
        fromUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        toUser: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        transferDate: { type: Date, default: Date.now },
        reason: { type: String },
      },
    ],
    specialRequests: {
      type: String,
      maxlength: [500, "Special requests cannot exceed 500 characters"],
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
