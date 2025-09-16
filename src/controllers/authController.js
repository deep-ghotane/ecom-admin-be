import { newAdmin } from "../models/users/userModel.js";

export const createNewUser = async (req, res) => {
  const payload = req.body;
  try {
    const admin = await newAdmin(payload);
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
