const {
  getProductsService,
  addProductService,
  getProductByIdServices,
  updateSingleProductService,
  deleteSingleProductService,
  updateMultipleProductService,
  deleteMultipleProductService,
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

    const products = await getProductsService(finalFilters, queries);

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

const updateMultipleProduct = async (req, res, next) => {
  try {
    const updatedData = req.body;

    const result = await updateMultipleProductService(updatedData);

    res.status(200).json({ status: "success", message: "product successfully updated" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update multiple product", error: error.message });
  }
};

const deleteSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await deleteSingleProductService(id);
    if (!result.deletedCount) throw new Error("unable to delete product");

    res.status(200).json({ status: "success", message: "product successfully deleted", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to delete product", error: error.message });
  }
};
const deleteMultipleProduct = async (req, res, next) => {
  try {
    const result = await deleteMultipleProductService(req.body);
    if (!result.deletedCount) throw new Error("unable to delete products");

    res.status(200).json({ status: "success", message: "product successfully deleted", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to delete products", error: error.message });
  }
};

module.exports = {
  createNewProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  updateMultipleProduct,
  deleteSingleProduct,
  deleteMultipleProduct,
};
