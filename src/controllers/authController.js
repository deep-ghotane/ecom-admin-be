import { findByFilter, newAdmin } from "../models/users/userModel.js";
import { decodeFunction, encodeFunction } from "../utils/encodeHelper.js";
import { createAccessToken } from "../utils/jwt.js";

export const createNewUser = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = encodeFunction(password);
  try {
    const admin = await newAdmin({ email, username, password: hashedPassword });
    if (admin) {
      return res
        .status(200)
        .json({ status: "success", message: "Admin created successfully" });
    } else {
      return res
        .status(500)
        .json({ status: "error", message: "Error creating admin" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    const user = await findByFilter({ email });
    if (user) {
      const result = decodeFunction(password, user.password);

      let payload = {
        email: user.email,
      };

      let accessToken = createAccessToken(payload);
      console.log(111, accessToken);
      if (result) {
        return res.status(200).json({
          status: "success",
          message: "Login Successful",
          accessToken,
        });
      } else {
        return res
          .status(500)
          .json({ status: "error", message: "Invalid credentials" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal Server error" });
  }
};
