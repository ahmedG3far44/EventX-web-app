import { Router } from "express";

import {
  createEvent,
  deleteEvent,
  getEvent,
  getEvents,
  updateEventStatus,
} from "../controllers/events.controllers.js";
import verifyIsAdmin from "../middlewares/verifyIsAdmin.js";

const router = Router();

router.get("/:eventId", getEvent);
router.get("/", getEvents);
router.post("/", verifyIsAdmin, createEvent);
router.put("/:id", verifyIsAdmin, updateEventStatus);
router.delete("/:id", verifyIsAdmin, deleteEvent);

export default router;
