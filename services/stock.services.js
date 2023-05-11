const Stock = require("../models/Stock");

const getStocksService = async (filters, queries) => {
  const stocks = await Stock.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);

  const total = await Stock.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, page, stocks };
};
const createStockService = async (data) => {
  const stock = await Stock.create(data);
  return stock;
};
const getStockByIdServices = async (id) => {
  const stock = await Stock.findById(id);
  return stock;
};
const updateSingleStockService = async (StockId, updatedData) => {
  const result = await Stock.updateOne({ _id: StockId }, updatedData, { runValidators: true });
  return result;
};
const updateMultipleStockService = async (data) => {
  // const result = await Stock.updateMany({ price: { $lte: 1000 } }, updatedData, { runValidators: true });

  const stocks = [];
  data.forEach((Stock) => {
    stocks.push(Stock.updateOne({ _id: Stock.id }, Stock.data));
  });

  const result = await Promise.all(Stocks);
  return result;
};
const deleteSingleStockService = async (StockId) => {
  const result = await Stock.deleteOne({ _id: StockId });
  return result;
};
const deleteMultipleStockService = async (ids) => {
  const result = await Stock.deleteMany({ _id: ids });
  return result;
};

module.exports = {
  getStocksService,
  createStockService,
  getStockByIdServices,
  updateSingleStockService,
  updateMultipleStockService,
  deleteSingleStockService,
  deleteMultipleStockService,
};
