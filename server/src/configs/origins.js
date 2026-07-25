import dotenv from "dotenv";

dotenv.config();

const originOptions = {
  origin: process.env.ALLOWED_ORIGINS || "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

export default originOptions;
