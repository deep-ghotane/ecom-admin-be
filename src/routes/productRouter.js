import express from "express";
import {
  addNewProduct,
  changeProductStatus,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productController.js";
import {
  addProductValidation,
  changeProductStatusValidation,
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
  upload.array("images", 3),
  addProductValidation,
  addNewProduct
);
router.patch(
  "/:id",
  upload.array("images", 3),
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

router.post(
  "/status",
  authMiddleware,
  isAdmin,
  changeProductStatusValidation,
  changeProductStatus
);

export default router;
