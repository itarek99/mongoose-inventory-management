const {
  createSupplierService,
  getSuppliersService,
  getSupplierByIdService,
  updateSupplierService,
} = require("../services/supplier.services");

const createSupplier = async (req, res) => {
  try {
    const result = await createSupplierService(req.body);
    res.status(200).json({ status: "success", message: "new supplier added" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "supplier insertion failed", error: error.message });
  }
};

const getSuppliers = async (req, res) => {
  try {
    const Suppliers = await getSuppliersService();
    res.status(200).json({ status: "success", data: Suppliers });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const getSupplierById = async (req, res) => {
  try {
    const { id } = req.params;
    const Supplier = await getSupplierByIdService(id);
    if (!Supplier) {
      return res.status(400).json({ status: "failed", message: "no supplier found" });
    }
    res.status(200).json({ status: "success", data: Supplier });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateSupplierService(id, req.body);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({ status: "failed", message: "failed to update Supplier", error: error.message });
    }

    res.status(200).json({ status: "success", message: "supplier details updated successfully", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update Supplier", error: error.message });
  }
};

module.exports = { createSupplier, getSuppliers, getSupplierById, updateSupplier };
