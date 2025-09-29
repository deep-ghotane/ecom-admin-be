import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
  updateUserProfile,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

router.put("/setting", authMiddleware, updateUserProfile);

export default router;
