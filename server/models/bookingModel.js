import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "user"
    },
    car: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Car"
    },
    startDate: { type: Date, required: [true, "start date is required"]},
    returnDate: { type: Date, required: [true, "return date is required"]},
    totalPrice: { type: Number, required: [true, "total price is required"]},
    price: { type: Number, required: [true, "price is required"]},
    status: {
        type: String,
        enum: ["pending", "confirm", "cancel"],
        default: "pending",
    },
},
{ timestamps: true }
)

const bookingModel = mongoose.model("Booking", bookingSchema);

export default bookingModel;