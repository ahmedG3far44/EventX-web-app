import { Schema, model, Types } from "mongoose";

const walletSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    currency: {
      type: String,
      default: "USD",
      uppercase: true,
      maxlength: 3,
    },
    transactions: [
      {
        amount: {
          type: Number,
          required: true,
        },
        type: {
          type: String,
          enum: ["withdraw", "deposit"],
          required: true,
        },
        description: {
          type: String,
          maxlength: 255,
        },
        reference: {
          type: String,
          unique: true,
          sparse: true,
        },
        status: {
          type: String,
          enum: ["pending", "completed", "failed"],
          default: "completed",
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Wallet = model("wallets", walletSchema);

export default Wallet;
