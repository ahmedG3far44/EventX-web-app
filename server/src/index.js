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
    res.send(`<div> 
      <h1>EventX API Server!!</h1>
      <p>Server is running in ${ENV} mode on port ${PORT}</p>
      <p>Visit <a href="http://localhost:5173">EventX Client</a> to access the client application.</p>
      </d>`);
  });

  app.use("/api", indexRouter);

  app.listen(PORT, () => {
    console.log(`server is running in ${ENV} on port ${PORT}`);
  });
});
