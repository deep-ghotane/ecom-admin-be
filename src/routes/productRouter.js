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

const router = express.Router();

router.get("/", getAllProducts);
router.post(
  "/",
  upload.array("images", 5),
  addProductValidation,
  addNewProduct
);
router.patch("/", updateProductValidation, updateProduct);
router.delete("/", deleteProductValidation, deleteProduct);
export default router;
