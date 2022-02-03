const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const Product = require("../models/products");
const jwt = require("jsonwebtoken");
const products = require("../models/products");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const posts = [
  {
    id: "0",
    title: "Lorem ipsum dolor sit amet",
    price: "1500",
    oldprice: "1501",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
    photo: "../../assets/images/tvscump.jpg",
    quantity: 1,
  },
  {
    id: "1",
    title: "Lorem ipsum dolor sit amet",
    price: "3000",
    oldprice: "",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
    photo: "../../assets/images/iphone12.jpg",
    quantity: 1,
  },
  {
    id: "2",
    title: "Lorem ipsum dolor sit amet",
    price: "3500",
    oldprice: "",
    text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!",
    photo: "../../assets/images/pc dark.jpeg",
    quantity: 1,
  },
  {
    id: "3",
    title: "Lorem ipsum dolor sit amet",
    price: "3500",
    oldprice: "",
    text: "Lorem, ipsum dolor sit amet conseLorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!ctetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi!Lorem, ipsum dolor  sit amet consectetur adipisicing elit. At laborum vitae sapiente. Quaerat praesentium, nam nesciunt adipisci fugiat laborum ducimus dolore quibusdam voluptas quidem! Quos sint magni saepe inventore excepturi! text-overflow: ellipsis; text-overflow: ellipsis;",
    photo: "../../assets/images/pc dark2.jpeg",
    quantity: 1,
  },
];

router.post("/upload", upload.single("foto"), (req, res) => {
  console.log(req.body.foto);
  res.status(200);
});

router.post("/addProduct", (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    price: req.body.price,
    specification: req.body.specification,
    photo: req.body.photo,
    quantity: req.body.quantity,
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

router.get("/posts", (req, res) => {
  res.status(200).json({
    message: "Posts fetched succesfully",
    posts: posts,
  });
  //   Product.find().then((posts) => {
  //     res.status(200).json({
  //       posts,
  //     });
  //     next();
  //   });
});
router.get("/product/:id", function (req, res) {
  res.status(200).json(posts[req.params.id]);
  // const id = new ObjectId(req.params.id);
  // Product.findOne({ _id: id }).then((product) => {
  //   if (!product) {
  //     res.status(401).json({
  //       message: "Product doesn't exists",
  //     });
  //   }
  //   res.status(200).json({
  //     product,
  //   });
  // });
});

router.get("/color", (req, res) => {
  res.json("blue");
});

module.exports = router;
