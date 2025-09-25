import {
  addProduct,
  deleteProductQuery,
  getAllProductsQuery,
  updateProductQuery,
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
  const imageFiles = req.files;
  const images = imageFiles.map((file) => "public/" + file.filename);
  try {
    const product = await addProduct({ ...payload, images });

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

export const updateProduct = async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const product = await updateProductQuery(id, rest);
    return res
      .status(200)
      .json({ status: "success", message: "Product updated" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await deleteProductQuery(id);
    return res
      .status(200)
      .json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
