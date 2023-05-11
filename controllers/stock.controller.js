const {
  createStockService,
  getStocksService,
  getStockByIdService,
  updateStockService,
} = require("../services/stock.services");

const createStock = async (req, res) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({ status: "success", message: "new stock added" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "stock insertion failed", error: error.message });
  }
};

const getStocks = async (req, res) => {
  try {
    const Stocks = await getStocksService();
    res.status(200).json({ status: "success", data: Stocks });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const getStockById = async (req, res) => {
  try {
    const { id } = req.params;
    const Stock = await getStockByIdService(id);
    if (!Stock) {
      return res.status(400).json({ status: "failed", message: "no stock found" });
    }
    res.status(200).json({ status: "success", data: Stock });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const updateStock = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateStockService(id, req.body);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({ status: "failed", message: "failed to update stock", error: error.message });
    }

    res.status(200).json({ status: "success", message: "stock details updated successfully", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update Stock", error: error.message });
  }
};

module.exports = { createStock, getStocks, getStockById, updateStock };
