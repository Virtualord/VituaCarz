import express from "express";
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDb } from "./config/db.js";
import userRoutes from './routes/userRoutes.js'
import carRoute from './routes/carRoute.js'
import bookingRoute from './routes/bookingRoute.js'

// dotenv
dotenv.config();

// database
connectDb();

// rest obj
const app = express()

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// routes 
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/car", carRoute);
app.use("/api/v1/booking", bookingRoute)

app.get("/", (req, res) => {
    res.status(200).send("<h1> Welcome to car server </h1>");
});

// port
const PORT = 
process.env.PORT || 8080;
// listen
app.listen(PORT, () => {
    console.log(
        `Server Running on Port ${PORT} in ${process.env.DEV_MODE} Mode`.bgBlue
    );
}) 

