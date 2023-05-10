const express = require("express");
const {
  getCategories,
  createCategory,
  getCategoryById,
  updateCategory,
} = require("../controllers/category.controller");

const router = express.Router();

router.route("/").get(getCategories).post(createCategory);
router.route("/:id").get(getCategoryById).patch(updateCategory);

module.exports = router;
