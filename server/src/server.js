import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import originOptions from "./configs/origins.js";
import indexRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import https from "https";
import fs from "fs";

import { connectDB } from "./configs/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;
const ENV = process.env.NODE_ENV;

connectDB().then(() => {
  app.use(cors(originOptions));

  app.use(express.json());

  app.use(cookieParser());

  app.get("/", (req, res) => {
    res.send("<h1> server is running good !! </h1>");
  });

  app.use("/api", indexRouter);

  if (ENV === "dev") {
    app.listen(PORT, () => {
      console.log(`server is running in ${ENV} on port `, PORT);
    });
  } else {
    const options = {
      key: fs.readFileSync(
        process.env.SSL_KEY ||
          "/etc/letsencrypt/live/folio.business/privkey.pem",
        "utf-8"
      ),
      cert: fs.readFileSync(
        process.env.SS_CERT ||
          "/etc/letsencrypt/live/folio.business/fullchain.pem",
        "utf-8"
      ),
    };
    https.createServer(options, app).listen(443, () => {
      console.log(`server is running in ${ENV} on port 443`);
    });
  }
});
