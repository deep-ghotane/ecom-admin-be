import mongoose from "mongoose";
import {
  deleteCategoryQuery,
  findBySlug,
  insertCategory,
  updateCategoryQuery,
  getAllCategories,
} from "../models/categories/categoryModel.js";
import slugify from "slugify";

export const fetchAllCategories = async (req, res, next) => {
  try {
    let allCategories = await getAllCategories();

    const categories = allCategories.filter(
      (category) => category.parent === null
    );
    const subCategories = allCategories.filter(
      (category) => category.parent !== null
    );

    return res.json({
      status: "success",
      message: "All categories fetched successfully",
      categories,
      subCategories,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed fetching all categories",
    });
  }
};

export const createCategory = async (req, res, next) => {
  try {
    let categoryObj = { ...req.body };
    console.log(categoryObj);
    if (
      !categoryObj.parent ||
      categoryObj.parent === "null" ||
      categoryObj.parent === ""
    ) {
      categoryObj.parent = null;
    }

    let baseSlug = slugify(categoryObj.name, { lower: true, strict: true });

    let existingCategory = await findBySlug({
      slug: baseSlug,
      parent: categoryObj.parent,
    });

    if (existingCategory) {
      baseSlug = `${baseSlug}-${Date.now()}`;
    }

    categoryObj.slug = baseSlug;

    let addCategory = await insertCategory({ ...categoryObj, products: [] });

    return res.status(200).json({
      status: "success",
      message: "Category created successfully",
      data: addCategory,
    });
  } catch (err) {
    console.error("Create category error:", err);
    if (err.code === 11000) {
      return res.json({
        status: "error",
        message:
          "A category with this name already exists under the same parent.",
      });
    }
    res.json({
      status: "error",
      message: "Failed creating category",
    });
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.body;
    const result = await deleteCategoryQuery(id);
    return res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed deleting category",
    });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid category ID" });
    }

    // If name is being updated, generate a new slug
    if (payload.name) {
      let baseSlug = slugify(payload.name, { lower: true, strict: true });

      const existingCategory = await findBySlug({
        slug: baseSlug,
        _id: { $ne: id },
      });

      if (existingCategory) {
        baseSlug = `${baseSlug}-${Date.now()}`;
      }

      payload.slug = baseSlug;
    }

    const updatedCategory = await updateCategoryQuery(id, payload, {
      new: true,
    });

    return res.json({
      status: "success",
      message: "Category updated successfully",
      data: updatedCategory,
    });
  } catch (err) {
    console.error("Update category error:", err);
    return res.json({
      status: "error",
      message: "Failed updating category",
    });
  }
};
