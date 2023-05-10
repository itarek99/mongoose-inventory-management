const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const validator = require("validator");

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
        values: ["kg", "liter", "pcs", "lbs", "bag"],
        message: "use a valid unit, kg/litter/pcs/lbs,bag",
      },
    },

    imageURLs: [
      {
        type: String,
        required: true,
        validate: [validator.isURL, "please provide valid image urls"],
      },
    ],

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
