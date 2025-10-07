import {
  deleteCategoryQuery,
  getAllCategories,
  insertCategory,
} from "../models/categories/categoryModel.js";

export const fetchAllCategories = async (req, res, next) => {
  try {
    let categories = await getAllCategories();

    return res.json({
      status: "success",
      message: "All categories fetched successfully",
      categories,
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
    let categoryObj = req.body;
    let addCategory = await insertCategory(categoryObj);
    console.log(addCategory);

    return res.json({
      status: "success",
      message: "Category created successfully",
      data: addCategory,
    });
  } catch (err) {
    res.json({
      status: "error",
      message: "Failed creating category",
      error: err.message,
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
