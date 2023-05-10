const {
  createCategoryService,
  getCategoriesService,
  getCategoryByIdService,
  updateCategoryService,
} = require("../services/category.services");

const createCategory = async (req, res) => {
  try {
    const result = await createCategoryService(req.body);
    res.status(200).json({ status: "success", message: "new category added" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "category added insertion failed", error: error.message });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await getCategoriesService();
    res.status(200).json({ status: "success", data: categories });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await getCategoryByIdService(id);
    if (!category) {
      return res.status(400).json({ status: "failed", message: "no product found" });
    }
    res.status(200).json({ status: "success", data: category });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateCategoryService(id, req.body);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({ status: "failed", message: "failed to update category", error: error.message });
    }

    res.status(200).json({ status: "success", message: "category details updated successfully", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update category", error: error.message });
  }
};

module.exports = { createCategory, getCategories, getCategoryById, updateCategory };
