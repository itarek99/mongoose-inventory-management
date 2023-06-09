const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
// const DBConnect = require("./utils/dbConnect");

const app = require("./app");

// database connection

mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log("db connection successful");
  })
  .catch(() => {
    console.log("error connecting to database");
  });

// DBConnect();

// server
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`app is running on port ${port}`.yellow.bold);
});
