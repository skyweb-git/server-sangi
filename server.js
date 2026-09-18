import express from "express";
// cors package no longer needed — using manual CORS headers below
import morgan from "morgan";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { autoSeedData } from "./scripts/seed.js";

// Routes
import leadRoutes from "./routes/leadRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import mediaRoutes from "./routes/mediaRoutes.js";
import contentRoutes from "./routes/contentRoutes.js";

import sessionRoutes from "./routes/sessionRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ─── MANUAL CORS HEADERS (runs FIRST, before body parsing) ───
// This guarantees CORS headers are on EVERY response, even if
// body parsing fails or the request errors/timeouts downstream.
const allowedOrigins = [
  "https://admin.sanghicity.in",
  "https://sanghicity.in",
  "https://www.sanghicity.in",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (process.env.CORS_ORIGIN === "*") {
    // When wildcard, reflect the requesting origin (avoids * + credentials conflict)
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
  } else if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Immediately respond to preflight OPTIONS
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  next();
});

// Body parsing & logging
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(morgan("dev"));

// Health check endpoint (for deployment platforms like Render, Railway, Vercel)
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Maytri Ambhuja Real Estate CRM API",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.get("/", (req, res) => {
  res.json({
    message: "🚀 Maytri Ambhuja Real Estate Server is Running Successfully",
    healthCheck: "/api/health",
    documentation: {
      leads: "/api/leads",
      employees: "/api/employees",
      activity: "/api/activity/calls | /api/activity/emails",
      sessions: "/api/sessions/monitoring | /api/sessions/login",
      auth: "/api/auth/login",
      analytics: "/api/auth/analytics",
      media: "/api/media",
      content: "/api/content",
    },
  });
});

// Mount API routes
app.use("/api/leads", leadRoutes);
app.use("/api/employees", employeeRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/content", contentRoutes);


// 404 Handler for undefined routes
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
});

// Global Error Handler — also sets CORS headers so errors aren't blocked
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  const origin = req.headers.origin;
  if (origin) {
    res.setHeader("Access-Control-Allow-Origin", origin);
    res.setHeader("Access-Control-Allow-Credentials", "true");
  }
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Start Server & Connect MongoDB
const startServer = async () => {
  const conn = await connectDB();
  if (conn) {
    await autoSeedData();
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`====================================================`);
    console.log(`🚀 Maytri Real Estate Server running on port ${PORT}`);
    console.log(`📡 Local API:   http://localhost:${PORT}`);
    console.log(`🌍 Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
};

startServer();
