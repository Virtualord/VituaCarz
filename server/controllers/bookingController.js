import bookingModel from "../models/bookingModel.js";
import carModel from "../models/carModel.js";
import userModel from "../models/userModel.js";

// Booking
export const createBooking = async (req, res) => {
    try {
        const { user, car, startDate, returnDate, price, totalPrice } = req.body
        if (!car || !user || !startDate || !returnDate || !price || !totalPrice) {
            return res.status(500).send({
                success: false,
                message: "Please provide all fields"
            })
        }
        const booking = new bookingModel({ user, car, startDate, returnDate, price, totalPrice })
        await booking.save()
        res.status(201).send({
            success: true,
            message: "Booking created",
            booking,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in create booking API",
            error
        })
    }
}

// get all booking
export const getAllBookings = async (req, res) => {
    try {
        const booking = await bookingModel.find({});
        res.status(200).send({
            success: true,
            TotalBookings: booking.length,
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get all booking API",
            error,
        });
    }
}

// Get booking by id
export const getBookingDetails = async (req, res) => {
    try {
        const {id} = req.params
        if(!id){
            return res.status(404).send({success: false, message: "Please provide booking id"})
        }
        const booking = await bookingModel.findById({_id:id})
        if (!booking) {
            return res.status(404).send({success: false, message: "No booking found with this id"})
        }
        const user = await userModel.findById({_id: booking.user});
        const car = await carModel.findById({ _id: booking.car });
        res.status(200).send({
            success: true,
            message: "Booking details fetched successfully",
            booking: {
                id: booking._id,
                customerName: user.uname,
                phone: user.phone,
                startDate: booking.startDate,
                returnDate: booking.returnDate,
                price: car.price,
                totalPrice: booking.totalPrice,
                status: booking.status,
                bookingTime: booking.createdAt,
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in booking details API",
            error,
        });
    }
}

// Change booking status
export const updateBookingStatus = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404)
            .send({
                success: false,
                message: "Please provide booking id"
            })
        }
        const {status} = req.body
        const booking = await bookingModel.findByIdAndUpdate(
            id, 
            {$set: {status: status}}, 
            {returnOrignal: false}
        );
        res.status(200).send({
            success: true,
            message: "Booking status updated",
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in booking update API",
            error,
        });
    }
}

// User update booking dates (adds ₹200 penalty)
export const updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({
                success: false,
                message: "Please provide booking id",
            });
        }

        const { startDate, returnDate } = req.body;
        if (!startDate || !returnDate) {
            return res.status(400).send({
                success: false,
                message: "Please provide startDate and returnDate",
            });
        }

        if (new Date(returnDate) < new Date(startDate)) {
            return res.status(400).send({
                success: false,
                message: "Return date cannot be before start date",
            });
        }

        const existing = await bookingModel.findById(id);
        if (!existing) {
            return res.status(404).send({
                success: false,
                message: "Booking not found",
            });
        }

        const PENALTY = 200;
        const updatedTotalPrice = existing.totalPrice + PENALTY;

        const booking = await bookingModel.findByIdAndUpdate(
            id,
            { $set: { startDate, returnDate, totalPrice: updatedTotalPrice } },
            { returnDocument: "after" }
        );

        res.status(200).send({
            success: true,
            message: "Booking updated successfully. ₹200 penalty applied.",
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in update booking API",
            error,
        });
    }
};

// User bookings
export const getUserBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(404).send({ 
                success: false, 
                message: "Please provide user id"
            });
        }
        
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found"
            });
        }

        const booking = await bookingModel.find({ user: user._id }).populate("car", "name image price");
        
        res.status(200).send({
            success: true,
            message: "Your Bookings",
            totalBooking: booking.length,
            booking,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in get user bookings API",
            error,
        });
    }
};