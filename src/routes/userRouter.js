import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserDetail } from "../controllers/userController.js";

const router = express.Router();

router.get("/detail", authMiddleware, getUserDetail);

export default router;
