import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
      maxlength: [200, "Title cannot exceed 200 characters"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    category: {
      type: String,
      required: [true, "Event category is required"],
      enum: [
        "music",
        "sports",
        "technology",
        "business",
        "art",
        "food",
        "travel",
        "education",
        "health",
        "entertainment",
      ],
    },
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    venue: {
      name: {
        type: String,
        required: [true, "Venue name is required"],
        trim: true,
      },
      address: {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        country: { type: String, required: true, trim: true },
        zipCode: { type: String, trim: true },
        coordinates: {
          latitude: { type: Number },
          longitude: { type: Number },
        },
      },
    },
    dateTime: {
      start: {
        type: Date,
        required: [true, "Event start date is required"],
      },
      end: {
        type: Date,
        required: [true, "Event end date is required"],
      },
    },
    pricing: {
      general: {
        type: Number,
        required: [true, "General ticket price is required"],
        min: [0, "Price cannot be negative"],
      },
      vip: {
        type: Number,
        default: 0,
        min: [0, "Price cannot be negative"],
      },
      student: {
        type: Number,
        default: 0,
        min: [0, "Price cannot be negative"],
      },
    },
    capacity: {
      total: {
        type: Number,
        required: [true, "Total capacity is required"],
        min: [1, "Capacity must be at least 1"],
      },
      general: {
        type: Number,
        required: true,
        min: [0, "General seats cannot be negative"],
      },
      vip: {
        type: Number,
        default: 0,
        min: [0, "VIP seats cannot be negative"],
      },
      student: {
        type: Number,
        default: 0,
        min: [0, "Student seats cannot be negative"],
      },
    },
    availableSeats: {
      general: { type: Number },
      vip: { type: Number },
      student: { type: Number },
    },
    images: [
      {
        url: { type: String },
        alt: { type: String },
        isPrimary: { type: Boolean, default: false },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "active", "completed", "cancelled"],
      default: "draft",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    requirements: {
      ageRestriction: {
        type: Number,
        default: 0,
        min: [0, "Age restriction cannot be negative"],
      },
      specialRequirements: [String],
    },
    visibility: {
      type: String,
      enum: ["public", "private", "invited"],
      default: "public",
    },
    registrationDeadline: {
      type: Date,
    },
    maxTicketsPerUser: {
      type: Number,
      default: 10,
      min: [1, "Max tickets per user must be at least 1"],
    },
    isRefundable: {
      type: Boolean,
      default: false,
    },
    refundPolicy: {
      type: String,
      maxlength: [500, "Refund policy cannot exceed 500 characters"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Event = model("events", eventSchema);

export default Event;
