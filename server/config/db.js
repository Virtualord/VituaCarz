import mongoose from "mongoose";

export const connectDb = async () => {
    try {
        const URI = process.env.MONGO_URI;
        const conn = await mongoose.connect(URI);
        if (conn) {
            console.log(
                `Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta
                .white
            )
        }
    } catch (error) {
        console.log(error);
    }
};