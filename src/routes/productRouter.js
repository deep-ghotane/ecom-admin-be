import express from "express";
import {
  addNewProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  addProductValidation,
  deleteProductValidation,
  updateProductValidation,
} from "../middleware/joiMiddleware.js";
import { upload } from "../middleware/multerconfig.js";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  authMiddleware,
  isAdmin,
  upload.array("images", 5),
  addProductValidation,
  addNewProduct
);
router.patch(
  "/:id",
  upload.array("images", 5),
  authMiddleware,
  isAdmin,
  updateProductValidation,
  updateProduct
);
router.delete(
  "/",
  authMiddleware,
  isAdmin,
  deleteProductValidation,
  deleteProduct
);
export default router;
