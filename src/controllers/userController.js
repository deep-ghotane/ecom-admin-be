import {
  findByFilter,
  getAllUsers,
  newAdmin,
} from "../models/users/userModel.js";

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
    const user = await newAdmin({ username, email, password, role });

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
