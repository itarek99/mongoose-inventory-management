const express = require("express");
const { getStores, createStore, getStoreById, updateStore } = require("../controllers/store.controller");

const router = express.Router();

router.route("/").get(getStores).post(createStore);
router.route("/:id").get(getStoreById).patch(updateStore);

module.exports = router;
