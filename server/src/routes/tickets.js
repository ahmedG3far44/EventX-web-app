import { Router } from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import { buyTickets } from "../controllers/tickets.controllers.js";

const router = Router();

router.post("/", verifyAccessToken, buyTickets);

export default router;
