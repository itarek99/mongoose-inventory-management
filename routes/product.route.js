const express = require("express");
const {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  updateMultipleProduct,
  deleteMultipleProduct,
} = require("../controllers/product.controller");
const router = express.Router();

router.route("/bulk-update").patch(updateMultipleProduct);
router.route("/bulk-delete").delete(deleteMultipleProduct);

router.route("/").get(getAllProduct).post(createNewProduct);

router.route("/:id").get(getSingleProduct).patch(updateSingleProduct).delete(deleteSingleProduct);

module.exports = router;
