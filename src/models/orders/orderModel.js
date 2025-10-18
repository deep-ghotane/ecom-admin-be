import Order from "./orderSchema.js";

export const updateById = (id, updateObj) => {
  return Order.findByIdAndUpdate(id, updateObj);
};

export const getAllOrders = () => {
  return Order.find();
};
