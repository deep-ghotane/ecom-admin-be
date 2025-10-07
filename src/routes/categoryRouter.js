import express from "express";
import {
  createCategory,
  deleteCategory,
  fetchAllCategories,
} from "../controllers/categoryController.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import {
  createCategoryValidation,
  deleteCategoryValidation,
} from "../middleware/joiMiddleware.js";

const router = express.Router();

router.post(
  "/",
  createCategoryValidation,
  authMiddleware,
  isAdmin,
  createCategory
);
router.get("/", authMiddleware, isAdmin, fetchAllCategories);
router.delete(
  "/",
  deleteCategoryValidation,
  authMiddleware,
  isAdmin,
  deleteCategory
);

export default router;
