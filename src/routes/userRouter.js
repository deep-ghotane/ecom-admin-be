import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
  registerUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

router.post("/setting", authMiddleware, registerUserController);

export default router;
