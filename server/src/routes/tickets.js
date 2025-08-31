import { Router } from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import {
  buyTickets,
  getUserTickets,
  getTicketsByEventId,
} from "../controllers/tickets.controllers.js";

const router = Router();

// get users tickets
// get tickets by events (id)
// post buy ticket
router.post("/", buyTickets);
router.get("/", getUserTickets);
router.get("/", getTicketsByEventId);

export default router;
