const {
  createStoreService,
  getStoresService,
  getStoreByIdService,
  updateStoreService,
} = require("../services/store.services");

const createStore = async (req, res) => {
  try {
    const result = await createStoreService(req.body);
    res.status(200).json({ status: "success", message: "new store added" });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "store insertion failed", error: error.message });
  }
};

const getStores = async (req, res) => {
  try {
    const Stores = await getStoresService();
    res.status(200).json({ status: "success", data: Stores });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const getStoreById = async (req, res) => {
  try {
    const { id } = req.params;
    const Store = await getStoreByIdService(id);
    if (!Store) {
      return res.status(400).json({ status: "failed", message: "no store found" });
    }
    res.status(200).json({ status: "success", data: Store });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "something went wrong", error: error.message });
  }
};
const updateStore = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await updateStoreService(id, req.body);
    console.log(result);
    if (!result.modifiedCount) {
      return res.status(400).json({ status: "failed", message: "failed to update Store", error: error.message });
    }

    res.status(200).json({ status: "success", message: "store details updated successfully", result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "failed to update store", error: error.message });
  }
};

module.exports = { createStore, getStores, getStoreById, updateStore };
