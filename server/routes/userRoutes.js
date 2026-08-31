import express from "express"
import { login, register } from "../controllers/userController.js"

const router = express.Router();

// Register || POST
router.post("/register", register);

// Login || POST
router.post("/login", login);

export default router;