import { Router } from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEventStatus,
} from "../controllers/events.controllers.js";

// import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";
import verifyAccessToken from "../middlewares/verifyAccessToken.js";

const router = Router();

router.get("/:eventId", getEvent);
router.get("/", getEvents);
router.post("/", verifyAccessToken, createEvent);
router.put("/:id", verifyAccessToken, updateEventStatus);
router.delete("/:id", verifyAccessToken, deleteEvent);

export default router;
