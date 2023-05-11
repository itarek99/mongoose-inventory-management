const {
  createStockService,
  getStockByIdServices,
  updateSingleStockService,
  updateMultipleStockService,
  deleteSingleStockService,
  deleteMultipleStockService,
  getStocksService,
} = require("../services/stock.services");

const createStock = async (req, res, next) => {
  try {
    const result = await createStockService(req.body);
    res.status(200).json({ status: "success", message: "new stock added", data: result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "stock insertion failed", error: error.message });
  }
};

const getStocks = async (req, res, next) => {
  try {
    const filters = { ...req.query };
    const excludeFields = ["sort", "page", "limit", "fields"];

    excludeFields.forEach((field) => delete filters[field]);

    const filtersString = JSON.stringify(filters).replace(/\b(gt|gte|lt|lte)\b/g, (matched) => `$${matched}`);
    const finalFilters = JSON.parse(filtersString);

    const queries = {};
    if (req.query.sort) {
      queries.sortBy = req.query.sort.split(",").join(" ");
    }

    if (req.query.fields) {
      queries.fields = req.query.fields.split(",").join(" ");
    }

    if (req.query.page || req.query.limit) {
      const { page = 1, limit = 10 } = req.query;
      if (+page <= 0) {
        queries.skip = 0;
      } else {
        queries.skip = (page - 1) * limit;
      }
      queries.limit = +limit;
    }

    const Stocks = await getStocksService(finalFilters, queries);

    res.status(200).json({ status: "success", data: Stocks });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Stock not found", error: error.message });
  }
};

const getStockById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stock = await getStockByIdServices(id);
    if (!stock) {
      return res.status(400).json({ status: "failed", error: "stock not found" });
    }
    res.status(200).json({ status: "success", data: stock });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "Stock not found", error: error.message });
  }
};
const updateSingleStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateSingleStockService(id, updatedData);
    res.status(200).json({ status: "success", message: "Stock successfully updated" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update Stock", error: error.message });
  }
};

const updateMultipleStock = async (req, res, next) => {
  try {
    const updatedData = req.body;

    const result = await updateMultipleStockService(updatedData);

    res.status(200).json({ status: "success", message: "Stock successfully updated" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update multiple Stock", error: error.message });
  }
};

const deleteSingleStock = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleStockService(id);
    if (!result.deletedCount) throw new Error("unable to delete Stock");

    res.status(200).json({ status: "success", message: "Stock successfully deleted", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to delete Stock", error: error.message });
  }
};
const deleteMultipleStock = async (req, res, next) => {
  try {
    const result = await deleteMultipleStockService(req.body);
    if (!result.deletedCount) throw new Error("unable to delete Stocks");

    res.status(200).json({ status: "success", message: "Stock successfully deleted", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to delete Stocks", error: error.message });
  }
};

module.exports = {
  createStock,
  getStocks,
  getStockById,
  updateSingleStock,
  updateMultipleStock,
  deleteSingleStock,
  deleteMultipleStock,
};
