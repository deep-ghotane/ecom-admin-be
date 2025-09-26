import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

export default router;
