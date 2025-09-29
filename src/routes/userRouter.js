import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
  registerUserController,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", authMiddleware, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

router.post("/setting", authMiddleware, registerUserController);

export default router;
