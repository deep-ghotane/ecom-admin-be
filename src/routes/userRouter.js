import express from "express";
import {
  authMiddleware,
  isAdmin,
  isSuperAdmin,
} from "../middleware/authMiddleware.js";
import {
  getAllUsersController,
  getUserDetail,
 registerUserController,
  updateUserProfile,
} from "../controllers/userController.js";
import { createUserByAdminValidation } from "../middleware/joiMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, getAllUsersController);

router.get("/setting", authMiddleware, getUserDetail);

router.post(
  "/setting",
  authMiddleware,
  isSuperAdmin,
  createUserByAdminValidation,
  registerUserController
);

router.put("/setting", authMiddleware, updateUserProfile);

export default router;
