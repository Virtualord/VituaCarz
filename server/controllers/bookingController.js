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

// User bookings
export const getUserBooking = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res
            .status(404)
            .send({ 
                success: false, 
                message: "Please provide booking id"
            });
        }
        const user = await userModel.findById({_id:id})
        // Booking
        const booking = await bookingModel.find({user: user._id})
        if (!booking) {
            return res
            .status(404)
            .send({ 
                success: false, 
                message: "No Booking found"
            });
        }
        const car = await carModel.find({_id:booking[0].car})
        res.status(200).send({
            success: true,
            message: "Your Bookings",
            totalBooking: booking.length,
            booking,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in booking update API",
            error,
        })
    }
}