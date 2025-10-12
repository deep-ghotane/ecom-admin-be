import {
  addProduct,
  deleteProductQuery,
  getAllProductsQuery,
  getProductsById,
  updateProductQuery,
} from "../models/products/productModel.js";
import cloudinary from "../config/cloudinaryConfig.js";
import { findByFilterandGetSomething } from "../models/categories/categoryModel.js";
import { slugifyItem } from "../utils/slugify.js";

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
  const { category, ...payload } = req.body;
  const slug = slugifyItem(payload.name);
  const categoriesId = await findByFilterandGetSomething(
    { name: { $in: category } },
    "_id"
  );
  const categoriesIdArray = categoriesId.map((idObj) => idObj._id);
  const imageFiles = req.files;
  const uploadImages = async (files) => {
    try {
      const uploadPromises = files.map((file) => {
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
    const images = cloudinaryResult.map((res) => res.secure_url);

    const product = await addProduct({
      ...payload,
      images,
      category: categoriesIdArray,
      slug,
    });

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

export const changeProductStatus = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await getProductsById(id);
    if (!product) {
      return res
        .status(404)
        .json({ status: "error", message: "Product not found" });
    }
    let status = product.status;
    if (status === "active") {
      status = "inactive";
    } else {
      status = "active";
    }
    const result = await updateProductQuery(id, {
      status: status,
    });
    return res
      .status(200)
      .json({ status: "success", message: "Product status changed" });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
