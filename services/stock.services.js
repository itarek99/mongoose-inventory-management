const Stock = require("../models/Stock");

const createStockService = async (data) => {
  const result = await Stock.create(data);
  return result;
};
const getStocksService = async () => {
  const result = await Stock.find({});
  return result;
};
const getStockByIdService = async (id) => {
  const result = await Stock.findById(id);
  return result;
};
const updateStockService = async (id, data) => {
  const result = await Stock.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};

module.exports = { createStockService, getStocksService, getStockByIdService, updateStockService };
