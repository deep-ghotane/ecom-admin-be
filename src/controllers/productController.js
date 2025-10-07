import {
  addProduct,
  deleteProductQuery,
  getAllProductsQuery,
  updateProductQuery,
} from "../models/products/productModel.js";
import cloudinary from "../config/cloudinaryConfig.js";

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
  const uploadImages = async (files) => {
    try {
      console.log("starting image uploads");
      const uploadPromises = files.map((file) => {
        console.log("uploading", file.path);
        return cloudinary.uploader.upload(file.path, {
          folder: "products",
          use_filename: true,
          unique_filename: true,
          overwrite: true,
        });
      });

      const results = await Promise.all(uploadPromises);
      return results;
    } catch (error) {
      console.log("Erroruploading images", error);
      throw error;
    }
  };

  try {
    const cloudinaryResult = await uploadImages(imageFiles);
    console.log(cloudinaryResult);
    const images = cloudinaryResult.map((res) => res.secure_url);
    console.log(images);

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
    const { id } = req.params;
    const payload = req.body;
    console.log(111, payload);
    const product = await updateProductQuery(id, payload);
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
