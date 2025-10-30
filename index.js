import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookingRoutes from "./routes/bookingRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/bookings", bookingRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("🎫 Welcome to the Synergia Event Booking API (MongoDB Version)");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
