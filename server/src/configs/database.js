import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Connected Success...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
