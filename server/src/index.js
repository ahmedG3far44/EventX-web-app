import express from "express";
import cors from "cors";
import originOptions from "./configs/origins.js";
import indexRouter from "./routes/index.js";
import cookieParser from "cookie-parser";

import { connectDB } from "./configs/database.js";
import { env } from "./configs/env.js";

const app = express();
const PORT = env.PORT;
const ENV = env.NODE_ENV;

connectDB().then(() => {
  app.use(cors(originOptions));
  app.use(express.json());
  app.use(cookieParser());
  app.get("/", (req, res) => {
    res.send("<h1> server is running good !! </h1>");
  });

  app.use("/api", indexRouter);

  app.listen(PORT, () => {
    console.log(`server is running in ${ENV} on port ${PORT}`);
  });
});
