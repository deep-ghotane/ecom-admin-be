import { getAllOrders, updateById } from "../models/orders/orderModel.js";

export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await getAllOrders();
    if (!orders)
      return res
        .status(500)
        .json({ status: "error", message: "Error fetching orders" });
    return res
      .status(200)
      .json({ status: "success", message: "Orders Fetched", orders });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    if (!id || !status)
      return res
        .status(400)
        .json({ status: "error", message: "Invalid order id or status" });
    const result = await updateById(id, { status });
    if (!result)
      return res
        .status(500)
        .json({ status: "error", message: "Error updating order" });
    return res
      .status(200)
      .json({ status: "success", message: "Order status updated" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};
