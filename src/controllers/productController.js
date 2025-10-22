import {
  addProduct,
  deleteProductQuery,
  getAllProductsQuery,
  getProductsById,
  updateProductQuery,
} from "../models/products/productModel.js";
import { slugifyItem } from "../utils/slugify.js";
import { uploadImages } from "../utils/cloudinaryUpload.js";
import {
  findCategoryByFilter,
  updateCategoryQuery,
} from "../models/categories/categoryModel.js";

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
  const { category, subCategory, ...payload } = req.body;
  const imageFiles = req.files;
  const slug = slugifyItem(payload.name);
  const categoryId = await findCategoryByFilter({ name: category });
  const subCategoryId = await findCategoryByFilter({ name: subCategory });
  const productObj = {
    ...payload,
    slug,
    category: categoryId._id,
    subCategory: subCategoryId._id,
  };
  try {
    const cloudinaryResult = await uploadImages(imageFiles);
    const images = cloudinaryResult.map((res) => res.secure_url);
    productObj["images"] = images;
    const product = await addProduct(productObj);

    //add the product to the category collection as well.
    //this creates many to many relation between product and categories

    const categoryUpdate = await updateCategoryQuery(subCategoryId, {
      products: [...subCategoryId.products, product._id],
    });

    if (!product || !categoryUpdate) {
      return res
        .status(500)
        .json({ status: "error", message: "Error adding product" });
    }
    return res
      .status(200)
      .json({ status: "success", message: "Product added" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { imagesToDelete, category, subCategory, prevCategory, ...payload } =
      req.body;
    const slug = slugifyItem(payload.name);
    const imageFiles = req.files;
    const product = await getProductsById(id);

    const categoryUpdate = await updateCategoryQuery(subCategory, {
      $addToSet: { products: product._id },
    });

    //change previous category table
    if (prevCategory !== subCategory) {
      const prevCategoryInfo = await findCategoryByFilter({
        _id: prevCategory,
      });
      const filteredPrevCategoryProducts = prevCategoryInfo.products.filter(
        (product) => product != id
      );
      const prevCatUpdate = await updateCategoryQuery(prevCategory, {
        products: filteredPrevCategoryProducts,
      });
    }

    if (!product || !categoryUpdate)
      res.status(404).json({ status: "error", message: "Invalid product" });

    let filteredImages = [];

    //filter the images array
    if (imagesToDelete.length > 0) {
      filteredImages = product.images.filter(
        (images) => !imagesToDelete.includes(images)
      );
    }
    let images = [];
    if (imageFiles.length > 0) {
      const cloudinaryResult = await uploadImages(imageFiles);
      const cloudinaryImages = cloudinaryResult.map(
        (image) => image.secure_url
      );
      images = filteredImages.concat(cloudinaryImages);
    } else {
      images = product.images;
    }

    const finalPayload = { ...payload, slug, images, category, subCategory };
    const result = await updateProductQuery(id, finalPayload);

    return res
      .status(200)
      .json({ status: "success", message: "Product updated" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.body;
    const product = await deleteProductQuery(id);

    const category = await findCategoryByFilter(product.subCategory);
    const categoryUpdate = await updateCategoryQuery(category._id, {
      products: category.products.filter((product) => product != product._id),
    });

    if (!product || !categoryUpdate)
      return res
        .status(500)
        .json({ status: "error", message: "Error deleting product" });
    return res
      .status(200)
      .json({ status: "success", message: "Product deleted" });
  } catch (error) {
    console.log(error.message);
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
