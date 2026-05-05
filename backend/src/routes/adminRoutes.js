import express from "express";
import { getAdminStats } from "../controllers/adminController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/stats", protect, getAdminStats);

export default router;