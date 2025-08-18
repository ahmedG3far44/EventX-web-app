import { Schema, model } from "mongoose";

const analyticsSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    metrics: {
      views: { type: Number, default: 0 },
      uniqueViews: { type: Number, default: 0 },
      bookings: { type: Number, default: 0 },
      revenue: { type: Number, default: 0 },
      checkIns: { type: Number, default: 0 },
      cancellations: { type: Number, default: 0 },
      refunds: { type: Number, default: 0 },
    },
    demographics: {
      ageGroups: {
        "18-25": { type: Number, default: 0 },
        "26-35": { type: Number, default: 0 },
        "36-45": { type: Number, default: 0 },
        "46-55": { type: Number, default: 0 },
        "56+": { type: Number, default: 0 },
      },
      gender: {
        male: { type: Number, default: 0 },
        female: { type: Number, default: 0 },
        other: { type: Number, default: 0 },
      },
      locations: [
        {
          city: String,
          state: String,
          country: String,
          count: { type: Number, default: 0 },
        },
      ],
      interests: [
        {
          interest: String,
          count: { type: Number, default: 0 },
        },
      ],
    },
    trafficSources: {
      direct: { type: Number, default: 0 },
      search: { type: Number, default: 0 },
      social: { type: Number, default: 0 },
      referral: { type: Number, default: 0 },
      email: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

const Analytics = model("analytics", analyticsSchema);

export default Analytics;
