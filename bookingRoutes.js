import express from "express";
import { Booking } from "../models/booking.js";

const router = express.Router();

// ✅ 1. Get all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 2. Create a new booking
router.post("/", async (req, res) => {
  try {
    const { name, email, event, ticketType } = req.body;

    if (!name || !email || !event) {
      return res.status(400).json({ message: "Name, email, and event are required" });
    }

    const newBooking = new Booking({ name, email, event, ticketType });
    await newBooking.save();

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 3. Get booking by ID
router.get("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 4. Update booking by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedBooking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(updatedBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 5. Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 6. Search by email
router.get("/search", async (req, res) => {
  try {
    const { email } = req.query;
    const booking = await Booking.findOne({ email });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ 7. Filter by event
router.get("/filter", async (req, res) => {
  try {
    const { event } = req.query;
    const bookings = await Booking.find({ event });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
