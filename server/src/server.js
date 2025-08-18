import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import originOptions from "./configs/origins.js";
import indexRouter from "./routes/index.js";

import { connectDB } from "./configs/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB().then(() => {

  app.use(cors(originOptions));
  app.use(express.json());
  app.get("/", (req, res) => {
    res.send("<h1> server is running good !! </h1>");
  });
  app.use("/api", indexRouter);
  app.listen(PORT, () => {
    console.log("server is running in development on port ", PORT);
  });
  
});
