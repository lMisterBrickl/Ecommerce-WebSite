const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const Product = require("../models/products")
const jwt = require("jsonwebtoken");
const products = require("../models/products");

router.post("/addProduct",(req, res, next) =>{
    const product = new Product({
        title: req.body.title ,
        price: req.body.price,
        specification: req.body.specification,
        photo: req.body.photo,
        quantity: req.body.quantity,
        type: req.body.type,
    })
    product.save()
    .then(result=>{
        res.status(201).json({
            message:"Succesful add product",
            result: result
        })
    })
    .catch(err=>{
        res.status(500).json({
            message: "fail to add product",
            error: err
        })
    })
  
})


router.use("/posts", (req, res, next)=>{
    // const posts = [{
    //     id: '01',
    //     title: 'Tv Samsung',
    //     price: '1500',
    //     specification: 'diagonala 56 inch',
    //     photo: '../../assets/images/TV.jpg',
    //     quantity: 1
    //   },
    //   {
    //     id: '02',
    //     title: 'Iphone 12',
    //     price: '3000',
    //     specification: '128gb',
    //     photo: '../../assets/images/iphone12.jpg',
    //     quantity: 1
    //   },
    //   {
    //     id: '03',
    //     title: 'Pc Gaming',
    //     price: '3500',
    //     specification: 'i5 11600 gtx 1660',
    //     photo: '../../assets/images/pcscump.jpg',
    //     quantity: 1
    //   }]
    Product.find().then(posts =>{
        res.status(200).json({
            posts
          })
          next();
    })
        
    
})

module.exports = router; 