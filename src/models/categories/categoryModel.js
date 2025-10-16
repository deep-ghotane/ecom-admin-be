import Category from "./categorySchema.js";

// get all categories
export const getAllCategories = () => {
  return Category.find();
};

//find slug
export const findBySlug = (filter) => {
  return Category.findOne(filter);
};

export const findByFilter = (filter) => {
  return Category.find(filter);
};

export const findByFilterandGetSomething = (filter, getItem) => {
  return Category.find(filter).select(getItem);
};

//create new category
export const insertCategory = (categoryObj) => {
  return Category.create(categoryObj);
};

export const deleteCategoryQuery = (id) => {
  return Category.findByIdAndDelete(id);
};

export const updateCategoryQuery = (id, payload) => {
  return Category.findByIdAndUpdate(id, payload, { new: true });
};
