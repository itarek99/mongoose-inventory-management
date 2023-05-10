const Brand = require("../models/Brand");

const createBrandService = async (data) => {
  const result = await Brand.create(data);
  return result;
};
const getBrandsService = async () => {
  const result = await Brand.find({}).select("-products -suppliers");
  return result;
};
const getBrandByIdService = async (id) => {
  const result = await Brand.findById(id);
  return result;
};
const updateBrandService = async (id, data) => {
  const result = await Brand.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};

module.exports = { createBrandService, getBrandsService, getBrandByIdService, updateBrandService };
