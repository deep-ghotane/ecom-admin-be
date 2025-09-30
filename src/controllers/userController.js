import {
  findByFilter,
  getAllUsers,
  newAdmin,
  updateById,
} from "../models/users/userModel.js";
import { encodeFunction } from "../utils/encodeHelper.js";

export const getUserDetail = (req, res) => {
  res.send({
    status: "success",
    message: "User Details Found",
    user: req.user,
  });
};

export const getAllUsersController = async (req, res) => {
  try {
    const users = await getAllUsers();
    res.json({
      status: "success",
      message: "Users retrieved successfully",
      users,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed to retrieve users.",
    });
  }
};

export const registerUserController = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const hashedPassword = encodeFunction(password);

    // basic validation
    if (!username || !email || !password || !role) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields required" });
    }

    // check existing username
    const existingUsername = await findByFilter({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ status: "error", message: "Username already exists" });
    }
    // check existing email
    const existingEmail = await findByFilter({ email });
    if (existingEmail) {
      return res
        .status(400)
        .json({ status: "error", message: "Email already exists" });
    }

    // create user
    const user = await newAdmin({
      username,
      email,
      password: hashedPassword,
      role,
    });

    res.json({
      status: "success",
      message: "New user created successfully",
      user,
    });
  } catch (error) {
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyValue)[0];
      return res.status(400).json({
        status: "error",
        message: `${
          duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)
        } already exists`,
      });
    }
    res.status(500).json({ status: "error", message: error.message });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user?._id;
    const update = req.body;

    if (!userId) {
      return res.status(401).json({
        status: "error",
        message: "Unauthorized"
      });
    }
    const updatedUser = await updateById(userId, update, { new: true, runValidators: true });
    return res.json({
      status: "success",
      message: "User profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Failed to update user profile" || error.message,
    });
  }
};
