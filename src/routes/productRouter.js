import express from "express";
import {
  addNewProduct,
  getAllProducts,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", getAllProducts);
router.post("/", addNewProduct);

export default router;
