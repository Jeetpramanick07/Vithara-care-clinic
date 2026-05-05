import express from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointmentController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — anyone can book
router.post("/", createAppointment);

// Admin only
router.get("/", protect, getAppointments);
router.patch("/:id/status", protect, updateAppointmentStatus);

export default router;
