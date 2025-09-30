import { getAllUsers, updateById } from "../models/users/userModel.js";

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
}
