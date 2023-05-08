const Product = require("../models/Product");

const getProductsService = async () => {
  const products = await Product.find({});
  return products;
};
const addProductService = async (data) => {
  const product = await Product.create(data);
  return product;
};
const getProductByIdServices = async (id) => {
  const product = await Product.findById(id);
  return product;
};

module.exports = { getProductsService, addProductService, getProductByIdServices };
