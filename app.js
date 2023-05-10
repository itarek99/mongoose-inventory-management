const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/product.route");
const brandRouter = require("./routes/brand.route");
const categoryRouter = require("./routes/category.route");
const storeRouter = require("./routes/store.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/product", productRouter);
app.use("/api/v1/brand", brandRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/store", storeRouter);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
