const Store = require("../models/Store");

const createStoreService = async (data) => {
  const result = await Store.create(data);
  return result;
};
const getStoresService = async () => {
  const result = await Store.find({});
  return result;
};
const getStoreByIdService = async (id) => {
  const result = await Store.findById(id);
  return result;
};
const updateStoreService = async (id, data) => {
  const result = await Store.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};

module.exports = { createStoreService, getStoresService, getStoreByIdService, updateStoreService };
