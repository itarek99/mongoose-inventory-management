const {
  getProductsService,
  addProductService,
  getProductByIdServices,
  updateSingleProductService,
  deleteSingleProductService,
} = require("../services/product.services");

const createNewProduct = async (req, res, next) => {
  try {
    // save
    // const product = new Product(req.body);
    // if (product.quantity === 0) {
    //   product.status = "out-of-stock";
    // }
    // const result = await product.save();

    // create

    const result = await addProductService(req.body);
    result.logger();
    res.status(200).json({ status: "success", message: "new product added", data: result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "product insertion failed", error: error.message });
  }
};

const getAllProduct = async (req, res, next) => {
  try {
    // const products = await Product.find({ $and: [{ price: { $gte: 1000 } }, { price: { $lte: 1500 } }] });
    // const products = await Product.where("price").gte(700).lte(1400).where("quantity").gte(20);
    const products = await getProductsService();

    res.status(200).json({ status: "success", data: products });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "product not found", error: error.message });
  }
};

const getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await getProductByIdServices(id);
    res.status(200).json({ status: "success", data: product });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "product not found", error: error.message });
  }
};
const updateSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const result = await updateSingleProductService(id, updatedData);
    res.status(200).json({ status: "success", message: "product successfully updated" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update product", error: error.message });
  }
};
const deleteSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleProductService(id);
    if (res.deletedCount) {
      res.status(200).json({ status: "success", message: "product successfully deleted", result });
    } else {
      throw new Error("no product found");
    }
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to delete product", error: error.message });
  }
};

module.exports = { createNewProduct, getAllProduct, getSingleProduct, updateSingleProduct, deleteSingleProduct };
