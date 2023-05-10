const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema({});

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
