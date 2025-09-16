import { newAdmin } from "../models/users/userModel.js";
import { decodeFunction, encodeFunction } from "../utils/encodeHelper.js";

export const createNewUser = async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = encodeFunction(password);
  try {
    const admin = await newAdmin({ email, password: hashedPassword });
    if (admin) {
      res
        .status(200)
        .json({ status: "success", message: "Admin created successfully" });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "Error creating admin" });
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await findByFilter({ email });
    if (user) {
      const result = decodeFunction(password, user.password);
      password = "";
      if (result) {
        res
          .status(200)
          .json({ status: "success", message: "Login Successful" });
      } else {
        res
          .status(500)
          .json({ status: "error", message: "Invalid credentials" });
      }
    }
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal Server error" });
  }
};
