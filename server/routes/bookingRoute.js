import express from "express";
import { isAdmin, userAuth } from "../middleware/authMiddleware.js";
import { createBooking, getAllBookings, getBookingDetails, updateBookingStatus, getUserBooking } from "../controllers/bookingController.js";

const router = express.Router();

// Create || POST
router.post("/create", userAuth, createBooking);

// Get all Booking || GET
router.get("/get-all", getAllBookings);

// Get Booking detailds || GET
router.get("/get-details/:id", userAuth, isAdmin, getBookingDetails);

// Update booking status || PATCH
router.patch("/update-status/:id", userAuth, isAdmin, updateBookingStatus)

// Get user booking || GET
router.get("/user-booking/:id", userAuth, getUserBooking)

export default router;