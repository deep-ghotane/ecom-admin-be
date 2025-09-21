import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../controllers/productController.js";
import { addProductValidation } from "../middleware/joiMiddleware.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addProductValidation, addNewProduct);

export default router;
