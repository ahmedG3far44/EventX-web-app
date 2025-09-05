import { Router } from "express";
import {
  buyTickets,
  getUserTickets,
  getAllTickets,
} from "../controllers/tickets.controllers.js";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

router.post("/", verifyAccessToken, buyTickets);
router.get("/:userId", verifyAccessToken, getUserTickets);
router.get("/", verifyIsAdmin, getAllTickets);

export default router;
