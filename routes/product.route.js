const express = require("express");
const {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/").get(getAllProduct).post(createNewProduct);
router.route("/:id").get(getSingleProduct).patch(updateSingleProduct).delete(deleteSingleProduct);

module.exports = router;
