const Category = require("../models/Category");

const createCategoryService = async (data) => {
  const result = await Category.create(data);
  return result;
};
const getCategoriesService = async () => {
  const result = await Category.find({});
  return result;
};
const getCategoryByIdService = async (id) => {
  const result = await Category.findById(id);
  return result;
};
const updateCategoryService = async (id, data) => {
  const result = await Category.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};

module.exports = { createCategoryService, getCategoriesService, getCategoryByIdService, updateCategoryService };
