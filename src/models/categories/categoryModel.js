import Category from "./categorySchema.js";

// get all categories
export const getAllCategories = () => {
  return Category.find();
};

//create new category
export const insertCategory = (categoryObj) => {
  return Category.create(categoryObj);
};

export const deleteCategoryQuery = (id) => {
  return Category.findByIdAndDelete(id);
};

export const updateCategoryQuery = (id, payload) => {
  return Category.findByIdAndUpdate(id, payload);
};
