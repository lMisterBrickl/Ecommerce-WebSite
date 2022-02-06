const express = require("express");
const router = express.Router();
const Product = require("../models/products");
const multer = require("multer");

const upload = multer({
  dest: "uploads/",
});

router.get("/product/:id", (req, res) => {
  console.log("hi");
  Product.findById(req.params.id).then((result) => {
    console.log(result);
    res.status(200).json(result);
  });
});
router.post("/addProduct", upload.single("photo"), (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    specification: req.body.specification,
    photo: "http://" + req.headers.host + "/" + req.file.filename,
    quantity: parseInt(req.body.quantity),
    type: req.body.type,
  });

  product
    .save()
    .then((result) => {
      res.status(201).json({
        message: "Succesful add product",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "fail to add product",
        error: err,
      });
    });
});

router.use("/posts", (req, res, next) => {
  Product.find().then((posts) => {
    res.status(200).json({
      posts,
    });
  });
});

router.get("/specificPosts/:type", (req, res) => {
  Product.find({ type: req.params.type }).then((products) => {
    if (!products) {
      res.status(401).json({
        message: "0 products",
      });
    } else {
      res.status(201).json({
        message: "succes",
        posts: products,
      });
    }
  });
});

router.get("/search/:search", (req, res) => {
  console.log(req.params.search);
  Product.find({ title: { $regex: req.params.search } }).then((result) => {
    console.log(result);
    if (result.length < 1) {
      res.status(404).json({
        message: "0 products",
      });
    } else {
      res.status(201).json({
        message: "succes",
        posts: result,
      });
    }
  });
});
router.post("/updateProduct", upload.single("photo"), (req, res, next) => {
  let newProduct = {
    title: req.body.title,
    price: req.body.price,
    specification: req.body.specification,
    quantity: parseInt(req.body.quantity),
    type: req.body.type,
  };
  Product.findByIdAndUpdate(
    { _id: this.searchId },
    newProduct,
    (error, data) => {
      if (error) {
        console.log(error);
      } else {
        console.log(data);
      }
    }
  );
});

module.exports = router;
