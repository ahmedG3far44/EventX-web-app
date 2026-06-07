import mongoose from "mongoose";
import { env } from "./env.js";


export const connectDB = async () => {
  try {
    await mongoose.connect(env.DATABASE_URL);
    console.log("MongoDB Connected Success...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
