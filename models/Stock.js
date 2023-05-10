const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

const stockSchema = mongoose.Schema(
  {
    productId: {
      type: ObjectId,
      required: true,
      ref: "Product",
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      minLength: [3, "minimum 3 characters"],
      maxLength: [200, "maximum 200 characters"],
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },

    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litter", "pcs", "lbs", "bag"],
        message: "use a valid unit, kg/litter/pcs/lbs,bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: {
          validator: (value) => {
            if (!Array.isArray(value)) {
              return false;
            }
            let isValid = true;
            value.forEach((url) => {
              if (!validator.isURL(url)) {
                isValid = false;
              }
            });
            return isValid;
          },
          message: "please provide valid image urls",
        },
      },
    ],

    price: {
      type: Number,
      required: true,
      min: [0, "product price can't be negative"],
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, "product quantity can't be negative"],
    },

    category: {
      type: String,
      required: [true, "please add a category name"],
    },

    brand: {
      name: {
        type: String,
        required: [true, "please add a brand name"],
      },
      id: {
        type: ObjectId,
        ref: "Brand",
        require: true,
      },
    },

    status: {
      type: String,
      require: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "provide a valid status",
      },
      default: "in-stock",
    },

    store: {
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
      id: {
        type: ObjectId,
        required: true,
        ref: "Store",
      },
    },
    suppliedBy: {
      name: {
        type: String,
        required: [true, "please provide a supplier name"],
        trim: true,
      },
      id: {
        type: ObjectId,
        required: true,
        ref: "Supplier",
      },
    },
  },
  {
    timestamps: true,
  }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
