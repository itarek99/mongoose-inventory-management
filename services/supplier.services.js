const Supplier = require("../models/Supplier");

const createSupplierService = async (data) => {
  const result = await Supplier.create(data);
  return result;
};
const getSuppliersService = async () => {
  const result = await Supplier.find({});
  return result;
};
const getSupplierByIdService = async (id) => {
  const result = await Supplier.findById(id);
  return result;
};
const updateSupplierService = async (id, data) => {
  const result = await Supplier.updateOne({ _id: id }, data, { runValidators: true });
  return result;
};

module.exports = { createSupplierService, getSuppliersService, getSupplierByIdService, updateSupplierService };
