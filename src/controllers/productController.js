import {
  addProduct,
  getAllProductsQuery,
} from "../models/products/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await getAllProductsQuery();
    return res
      .status(200)
      .json({ status: "success", message: "Products fetched", products });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const addNewProduct = async (req, res) => {
  const payload = req.body;
  try {
    const product = await addProduct(payload);
    console.log(product);

    if (!product) {
      return res
        .status(500)
        .json({ status: "error", message: "Error adding product" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Product added" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
