import { Schema, model } from "mongoose";

const ticketSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    ticketType: {
      type: String,
      enum: ["general", "vip"],
      required: true,
    },
    seatsNumber: [String],
    price: {
      type: Number,
      required: true,
      min: [0, "Price cannot be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
    status: {
      type: String,
      enum: ["reserved", "paid"],
      default: "reserved",
    },
    qrCode: {
      type: String,
    },
    paymentDetails: {
      paymentId: Schema.Types.ObjectId,
      paymentMethod: {
        type: String,
        enum: ["card", "debit-card", "paypal", "stripe", "reserved"],
      },
      cardName: { type: String },
      cardNumber: { type: String },
      expiryDate: { type: String },
      cvc: { type: String },
      paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed", "refunded"],
        default: "completed",
      },
    },
  },
  {
    timestamps: true,
  }
);
ticketSchema.index({ event: 1, user: 1, ticketType: 1 });
const Ticket = model("tickets", ticketSchema);
export default Ticket;
