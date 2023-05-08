const mongoose = require("mongoose");

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

// mongoose middleware for saving data: pre / post
productSchema.pre("save", function (next) {
  // this => current doc

  if (this.quantity === 0) {
    this.status = "out-of-stock";
  }

  next();
});

// productSchema.post("save", function (doc, next) {
//   console.log("after saving data");
//   next();
// });

// methods inside schema
productSchema.methods.logger = function () {
  console.log(`${this.name} added`);
};

// create model SCHEMA => MODEL => QUERY
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
