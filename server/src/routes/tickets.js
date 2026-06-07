import { Router } from "express";
import {
  buyTickets,
  getUserTickets,
  getAllTickets,
  getTicketById,
} from "../controllers/tickets.controllers.js";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

router.post("/", verifyAccessToken, buyTickets);
router.get("/", verifyIsAdmin, getAllTickets);
router.get("/my/:userId", verifyAccessToken, getUserTickets);
router.get("/:ticketId", verifyAccessToken, getTicketById);

export default router;
