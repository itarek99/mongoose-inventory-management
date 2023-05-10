const express = require("express");
const { createBrand, getBrands, getBrandById, updateBrand } = require("../controllers/brand.controller");
const router = express.Router();

router.route("/").get(getBrands).post(createBrand);
router.route("/:id").get(getBrandById).patch(updateBrand);

module.exports = router;
