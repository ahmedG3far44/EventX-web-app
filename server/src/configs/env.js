import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || "5007",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET:
    process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/eventx",
  ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS || "http://localhost:5173",
};
