import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

export default router;
