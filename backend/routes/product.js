const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const Product = require("../models/products").default
const jwt = require("jsonwebtoken")

router.post("/addProduct",(req, res, next) =>{
    console.log(req.body)
    const product = new Product({
        title: req.body.title ,
        price: req.body.price,
        specification: req.body.specification,
        photo: req.body.photo,
        quantity: req.body.quantity,
        type: req.body.type,
    })
    console.log(product)
    .then(result=>{
        res.statusCode(201).json({
            message:"Succesful add product",
            result: result
        })
    })
    .catch(err=>{
        res.statusCode(500).json({
            message: "fail to add product",
            error: err
        })
    })
  
})

module.exports = router; 