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
const updateSingleProductService = async (productId, updatedData) => {
  const result = await Product.updateOne({ _id: productId }, updatedData, { runValidators: true });
  return result;
};
const updateMultipleProductService = async (data) => {
  // const result = await Product.updateMany({ price: { $lte: 1000 } }, updatedData, { runValidators: true });

  const products = [];
  data.forEach((product) => {
    products.push(Product.updateOne({ _id: product.id }, product.data));
  });

  const result = await Promise.all(products);
  return result;
};
const deleteSingleProductService = async (productId) => {
  const result = await Product.deleteOne({ _id: productId });
  return result;
};
const deleteMultipleProductService = async (ids) => {
  const result = await Product.deleteMany({ _id: ids });
  return result;
};

module.exports = {
  getProductsService,
  addProductService,
  getProductByIdServices,
  updateSingleProductService,
  updateMultipleProductService,
  deleteSingleProductService,
  deleteMultipleProductService,
};
