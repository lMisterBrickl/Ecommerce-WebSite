const express = require("express");
const User = require("../backend/models/users").default;
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/user");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/product");
const Product = require("./models/products");
const ObjectId = require("mongo-objectid");
const morgan = require("morgan");
const multer = require("multer");

app = express();

let searchId = new ObjectId("");

mongoose.connect("mongodb://localhost:27017/Licenta", function (err) {
  if (err) {
    console.log("Failed to connect" + err);
  } else {
    console.log("You are connected to db");
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/product/:id", function (req, res, next) {
  const id = new ObjectId(req.params.id);
  Product.findOne({ _id: id }).then((product) => {
    if (!product) {
      res.status(401).json({
        message: "Product doesn't exists",
      });
    }
    res.status(200).json({
      product,
    });
  });
});

app.get("/api/searchProd/:title", (req, res) => {
  Product.findOne({ title: req.params.title }).then((product) => {
    if (!product) {
      res.status(401).json({
        message: "Product doesn't exists",
      });
    }
    this.searchId = product._id;
    res.status(200).json({
      message: "Product was found succesfully",
      posts: product,
    });
  });
});

app.post("/api/deleteProduct", (req, res, next) => {
  Product.deleteOne({ _id: this.searchId }).then((result) => {
    if (!result) {
      res.status(401).json({
        message: "cant delete item",
      });
    }
    res.status(200).json({
      message: "Item was deleted succesfully",
    });
  });
});

app.use(morgan("dev"));
app.use(express.static("uploads"));

app.use("/api", productRoutes);
app.use("/api", userRoutes);

module.exports = app;
