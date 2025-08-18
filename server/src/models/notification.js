import { Schema, model } from "mongoose";

const notificationSchema = new Schema(
  {
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Notification title is required"],
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    message: {
      type: String,
      required: [true, "Notification message is required"],
      maxlength: [500, "Message cannot exceed 500 characters"],
    },
    type: {
      type: String,
      enum: [
        "event-reminder",
        "booking-confirmation",
        "payment-success",
        "event-update",
        "event-cancelled",
        "general",
      ],
      required: true,
    },
    relatedEvent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
    relatedTicket: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Ticket",
    },
    isRead: {
      type: Boolean,
      default: false,
    },
    readAt: {
      type: Date,
    },
    deliveryMethod: {
      type: String,
      enum: ["in-app", "email", "sms", "push"],
      default: "in-app",
    },
    scheduledFor: {
      type: Date,
      default: Date.now,
    },
    isSent: {
      type: Boolean,
      default: false,
    },
    sentAt: {
      type: Date,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
    },
  },
  {
    timestamps: true,
  }
);

const Notification = model("notifications", notificationSchema);

export default Notification;
