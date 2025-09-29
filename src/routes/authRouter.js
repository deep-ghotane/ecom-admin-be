import express from "express";
import { createNewUser, loginUser } from "../controllers/authController.js";
import {
  createUserValidation,
  loginValidation,
} from "../middleware/joiMiddleware.js";
import {
  authMiddleware,
  isAdmin,
  refreshMiddleware,
} from "../middleware/authMiddleware.js";
import { createAccessToken, createRefreshToken } from "../utils/jwt.js";

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createUserValidation, createNewUser);
router.post("/login", loginValidation, loginUser);

router.get("/refresh-token", refreshMiddleware, (req, res) => {
  if (!req.user) {
    return res
      .status(401)
      .json({ status: "error", message: "Invalid refresh token" });
  }
  let payload = { email: req.user.email };
  // create new access token
  let accessToken = createAccessToken(payload);
  const refreshToken = createRefreshToken(payload);

  return res.send({
    status: "success",
    message: "New access token generated",
    accessToken,
    refreshToken,
  });
});

export default router;
