import { Schema, model } from "mongoose";

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
      maxlength: [100, "Title cannot be more than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      maxlength: [1000, "Description cannot be more than 1000 characters"],
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    venue: {
      name: {
        type: String,
        required: true,
      },
      address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
      },
      capacity: {
        type: Number,
        required: true,
      },
    },
    dateTime: {
      type: Date,
      required: true,
    },
    organizer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: String,
      default: "default-event.jpg",
    },
    ticketTypes: [
      {
        name: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
          min: 0,
        },
        quantity: {
          type: Number,
          required: true,
          min: 0,
        },
        available: {
          type: Number,
          min: 0,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published", "cancelled", "completed"],
      default: "draft",
    },
    tags: [String],
  },
  {
    timestamps: true,
  }
);
const Event = model("events", eventSchema);

export default Event;
