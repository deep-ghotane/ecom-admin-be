import express from "express";
import {
  fetchAllOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, fetchAllOrders);
router.patch("/", authMiddleware, updateOrderStatus);

export default router;
