import express from "express";
import { authMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { fetchAllCustomers } from "../controllers/customerController.js";

const router = express.Router();

router.get("/", authMiddleware, isAdmin, fetchAllCustomers);

export default router;
