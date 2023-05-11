const express = require("express");
const { getStocks, createStock, getStockById, updateStock } = require("../controllers/stock.controller");
const router = express.Router();

router.route("/").get(getStocks).post(createStock);
router.route("/:id").get(getStockById).patch(updateStock);

module.exports = router;
