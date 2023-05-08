const express = require("express");
const { createNewProduct, getAllProduct, getSingleProduct } = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getAllProduct).post(createNewProduct);
router.get("/:id", getSingleProduct);

module.exports = router;
