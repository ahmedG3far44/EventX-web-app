import mongoose from "mongoose";

const TicketTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  available: {
    type: Number,
    required: true,
    min: 0,
  },
});

const EventLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    zipCode: {
      type: String,
      required: true,
      trim: true,
    },
  },
  capacity: {
    type: Number,
    required: true,
    min: 0,
  },
});

const EventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1000,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    datetime: {
      type: Date,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
      trim: true,
    },
    emoji: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2,
    },
    seatsAmount: {
      type: Number,
      required: true,
      min: 0,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: function (value) {
          return value <= this.seatsAmount;
        },
        message: "Available seats cannot exceed total seats amount",
      },
    },
    seatsMap: {
      type: [[Number]],
      required: true,
      validate: {
        validator: function (array) {
          return array.every(
            (row) =>
              Array.isArray(row) && row.every((seat) => [0, 1].includes(seat))
          );
        },
        message: "Seats map must be a 2D array of 0s and 1s",
      },
    },
    revenue: {
      type: Number,
      required: true,
      min: 0,
    },
    popularity: {
      type: String,
      required: true,
      enum: ["High Popularity", "Medium Popularity", "Low Popularity"],
    },
    ticketTypes: {
      type: TicketTypeSchema,
      required: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      enum: ["active", "upcoming", "closed", "canceled"],
      default: "upcoming",
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: EventLocationSchema,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Add index for better query performance
EventSchema.index({ datetime: 1 });
EventSchema.index({ category: 1 });
EventSchema.index({ popularity: 1 });
EventSchema.index({ status: 1 });

EventSchema.virtual("occupancyPercentage").get(function () {
  return (
    ((this.seatsAmount - this.availableSeats) / this.seatsAmount) *
    100
  ).toFixed(2);
});

const Event = mongoose.model("Event", EventSchema);

export default Event;
