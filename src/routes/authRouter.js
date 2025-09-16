import express from "express";
import { createNewUser, loginUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/", createNewUser);
router.post("/login", loginUser);

export default router;
