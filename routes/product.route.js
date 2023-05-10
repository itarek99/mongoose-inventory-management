const express = require("express");
const {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
  updateMultipleProduct,
  deleteMultipleProduct,
  fileUpload,
} = require("../controllers/product.controller");
const uploader = require("../middleware/uploader");

const router = express.Router();

router.post("/file-upload", uploader.single("productImage"), fileUpload);

router.route("/bulk-update").patch(updateMultipleProduct);
router.route("/bulk-delete").delete(deleteMultipleProduct);

router.route("/").get(getAllProduct).post(createNewProduct);

router.route("/:id").get(getSingleProduct).patch(updateSingleProduct).delete(deleteSingleProduct);

module.exports = router;
