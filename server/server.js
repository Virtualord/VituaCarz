import express from "express";
import colors from 'colors';
import cors from 'cors';
import morgan from 'morgan'
import dotenv from 'dotenv'
import { connectDb } from "./config/db.js";

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
app.get("/", (req, res) => {
    res.status(200).send("<h1> Welcome to car server </h1>");
});

// port
const PORT = 
process.env.PORT || 8080;
// listen
app.listen(PORT, () => {
    console.log(
        `Server Running on Port ${PORT} in ${process.env.DEV_MODE} Mode`
    );
}) 

