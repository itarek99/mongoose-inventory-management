const express = require("express");
const uploader = require("../middleware/uploader");
const {
  updateMultipleStock,
  deleteMultipleStock,
  getStocks,
  createStock,
  getStockById,
  updateSingleStock,
  deleteSingleStock,
} = require("../controllers/stock.controller");

const router = express.Router();

router.route("/bulk-update").patch(updateMultipleStock);
router.route("/bulk-delete").delete(deleteMultipleStock);

router.route("/").get(getStocks).post(createStock);

router.route("/:id").get(getStockById).patch(updateSingleStock).delete(deleteSingleStock);

module.exports = router;
