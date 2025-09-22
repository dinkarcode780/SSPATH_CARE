import express from "express";
import bookingController from "../controllers/cartBookingController.js";
import authMiddleware from "../middleware/isAuthenticated.js";

const router = express.Router();

router.post("/book", authMiddleware, bookingController.bookCartItems); // Book cart items
router.get("/", authMiddleware, bookingController.getUserBookings); // Get user bookings
router.get("/all", authMiddleware, bookingController.alluserBookings); // Get user bookings
router.put("/update-status", authMiddleware, bookingController.updateBookingStatus); // Update booking status
router.post("/cancel", authMiddleware, bookingController.cancelBooking); // Cancel booking

router.put("/verify", authMiddleware, bookingController.verifyPayment);

router.post("/create-order", authMiddleware, bookingController.createPaymentOrder);


export default router;
