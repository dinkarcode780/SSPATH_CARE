
import express from "express";
import { createBooking, getAllBookings, getBookingById, deleteBooking ,updateBooking,changeStatus} from "../controllers/bookingController.js";
import isAuthenticated from "../middleware/isAuthenticated.js";
import { bookingMiddleware } from "../middleware/bookingMiddleware.js";

const router = express.Router();

router.post("/",isAuthenticated, bookingMiddleware,createBooking); // Create a new booking
router.get("/",bookingMiddleware, getAllBookings); // Get all bookings
router.get("/id",isAuthenticated,bookingMiddleware, getBookingById); // Get a single booking by ID
router.delete("/:id",bookingMiddleware, deleteBooking); // Delete a booking by ID
router.put("/:id",bookingMiddleware, updateBooking); // Update a booking by ID
router.put("/update-status/:id",isAuthenticated, bookingMiddleware,changeStatus);

export default router;
