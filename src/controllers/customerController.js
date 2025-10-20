import { getAllCustomers } from "../models/customer/customerModel.js";

export const fetchAllCustomers = async (req, res) => {
  try {
    const customers = await getAllCustomers();
    if (!customers) {
      return res
        .status(500)
        .json({ status: "error", message: "Error fetching customer details" });
    }
    return res.status(200).json({
      status: "success",
      message: "Customer details fetched",
      customers,
    });
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
};
