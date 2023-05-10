const {
  createBrandService,
  getBrandsService,
  getBrandByIdService,
  updateBrandService,
} = require("../services/brand.services");

const createBrand = async (req, res) => {
  try {
    const result = await createBrandService(req.body);
    res.status(200).json({ status: "success", message: "new brand added" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "brand added insertion failed", error: error.message });
  }
};

const getBrands = async (req, res) => {
  try {
    const brands = await getBrandsService();
    res.status(200).json({ status: "success", data: brands });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const getBrandById = async (req, res) => {
  try {
    const { id } = req.params;
    const brand = await getBrandByIdService(id);
    if (!brand) {
      return res.status(400).json({ status: "failed", message: "no product found" });
    }
    res.status(200).json({ status: "success", data: brand });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateBrandService(id, req.body);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({ status: "failed", message: "failed to update brand", error: error.message });
    }

    res.status(200).json({ status: "success", message: "brand details updated successfully", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update brand", error: error.message });
  }
};

module.exports = { createBrand, getBrands, getBrandById, updateBrand };
