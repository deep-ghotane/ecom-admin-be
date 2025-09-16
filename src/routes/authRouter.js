import express from "express";
import { createNewUser } from "../controllers/authController.js";

const router = express.Router();

router.post("/", createNewUser);

export default router;
