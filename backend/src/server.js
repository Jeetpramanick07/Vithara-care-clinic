import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import blogRoutes from "./routes/blogRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import errorMiddleware from "./middleware/errorMiddleware.js";

dotenv.config();

const app = express();

/* =========================
   DATABASE
========================= */
connectDB();

/* =========================
   CORS
   Allows:
   - localhost:3000
   - localhost:3001
   - any localhost frontend port
   - deployed Vercel frontend
   - FRONTEND_URL from Render env
========================= */

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://vithara-care-clinic.vercel.app",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      // Allows Postman, browser direct URL visits, and server-to-server calls
      if (!origin) {
        return callback(null, true);
      }

      // Allow listed origins
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Allow any localhost port during development
      if (/^http:\/\/localhost:\d+$/.test(origin)) {
        return callback(null, true);
      }

      return callback(new Error(`CORS blocked for origin: ${origin}`));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* =========================
   HEALTH CHECK
========================= */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Vithara Care Clinic API is running.",
    version: "1.0.0",
  });
});

/* =========================
   API ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/admin", adminRoutes);

/* =========================
   404 HANDLER
========================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

/* =========================
   ERROR HANDLER
========================= */

app.use(errorMiddleware);

/* =========================
   SERVER START
========================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running at http://localhost:${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || "development"}`);
  console.log("   Allowed CORS origins:", allowedOrigins);
});