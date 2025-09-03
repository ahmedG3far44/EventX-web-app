import { Router } from "express";
import {
  getOverallAnalytics,
  getEventAnalytics,
  getUserAnalytics,
  getRevenueAnalytics,
  getAgeDistributionFromAgeField,
} from "../controllers/analytics.controllers.js";

const router = Router();

router.get("/overall", getOverallAnalytics);
router.get("/event/:eventId", getEventAnalytics);
router.get("/users", getUserAnalytics);
router.get("/revenue", getRevenueAnalytics);
router.get("/age", getAgeDistributionFromAgeField);

export default router;
