const Brand = require("../models/Brand");
const Product = require("../models/Product");

const getProductsService = async (filters, queries) => {
  const products = await Product.find(filters)
    .skip(queries.skip)
    .limit(queries.limit)
    .select(queries.fields)
    .sort(queries.sortBy);
  const total = await Product.countDocuments(filters);
  const page = Math.ceil(total / queries.limit);

  return { total, page, products };
};
const addProductService = async (data) => {
  const product = await Product.create(data);
  const { _id: productId, brand } = product;
  const result = await Brand.updateOne({ _id: brand.id }, { $push: { products: productId } }, { runValidators: true });
  console.log(result);
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
