export const env = {
  PORT: process.env.PORT || "5003",
  NODE_ENV: process.env.NODE_ENV || "development",
  JWT_SECRET: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
  DATABASE_URL: process.env.DATABASE_URL || "mongodb://localhost:27017/eventx",
  SSL_CERT: process.env.SSL_CERT || "",
  SSL_KEY: process.env.SSL_KEY || "",
};
