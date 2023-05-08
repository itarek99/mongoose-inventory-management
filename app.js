const express = require("express");
const cors = require("cors");
const productRouter = require("./routes/product.route");

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/product", productRouter);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

module.exports = app;
