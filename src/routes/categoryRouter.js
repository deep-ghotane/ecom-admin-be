import express from "express";
import {
  createCategory,
  fetchAllCategories,
} from "../controllers/categoryController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.get("/", fetchAllCategories);

export default router;
