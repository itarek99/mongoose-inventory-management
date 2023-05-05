const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(cors());

// schema design
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      unique: true,
      minLength: [3, "minimum 3 characters"],
      maxLength: [200, "maximum 200 characters"],
    },
    description: {
      type: String,
      required: [true, "description is required"],
    },
    price: {
      type: Number,
      required: true,
      min: [0, "price should be positive value or 0"],
    },
    unit: {
      type: String,
      required: true,
      enum: {
        values: ["kg", "litter", "pcs", "lbs"],
        message: "use a valid unit",
      },
    },
    quantity: {
      type: Number,
      required: true,
      min: 0,
      validate: {
        validator: (value) => {
          const isInt = Number.isInteger(value);
          if (isInt) {
            return true;
          } else {
            return false;
          }
        },
        message: "quantity should be integer type",
      },
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["in-stock", "out-of-stock", "discontinued"],
        message: "not a valid status",
      },
    },
    // createdAt: {
    //   type: Date,
    //   default: Date.now(),
    // },
    // updatedAt: {
    //   type: Date,
    //   default: Date.now(),
    // },

    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId,
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

// create model
const Product = mongoose.model("Product", productSchema);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
  try {
    // save
    // const product = new Product(req.body);
    // const result = await product.save();
    // create
    const result = await Product.create(req.body);
    res.status(200).json({ status: "success", message: "new product added", data: result });
  } catch (error) {
    res.status(400).json({ status: "failed", message: "product insertion failed", error: error.message });
  }
});

module.exports = app;
