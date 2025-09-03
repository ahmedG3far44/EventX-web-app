import { Router } from "express";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";
import {
  buyTickets,
  getUserTickets,
  getAllTickets,
} from "../controllers/tickets.controllers.js";

const router = Router();


router.post("/", verifyAccessToken, buyTickets);
router.get("/:userId", verifyAccessToken, getUserTickets);
router.get("/", getAllTickets);

export default router;
