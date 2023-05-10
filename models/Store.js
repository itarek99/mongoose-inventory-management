const mongoose = require("mongoose");
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const storeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please provide a store name"],
      lowercase: true,
      trim: true,
      enum: {
        values: ["barisal", "chittagong", "dhaka", "khulna", "mymensingh", "rajshahi", "rangpur", "sylhet"],
        message: "please provide a valid name",
      },
    },
    description: String,
    status: {
      type: string,
      enum: ["active", "inactive"],
      default: "active",
    },
    manager: {
      name: String,
      contactNumber: String,
      id: {
        type: ObjectId,
        ref: "User",
      },
    },
  },
  { timestamps: true }
);

const Store = mongoose.model("Store", storeSchema);
module.exports = Store;
