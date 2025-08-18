import express from "express";
import authRouter from "./auth.js";
import eventsRouter from "./events.js";
import ticketsRouter from "./tickets.js";
import notificationsRouter from "./notifications.js";
import analyticsRouter from "./analytics.js";
import usersRouter from "./users.js";

const router = express.Router();

//api/auth/login
//api/auth/register
//api/auth/logout
//api/auth/reset-password

router.use("/auth", authRouter);
router.use("/events", eventsRouter);
router.use("/tickets", ticketsRouter);
router.use("/analytics", analyticsRouter);
router.use("/notifications", notificationsRouter);
router.use("/users", usersRouter);

export default router;
