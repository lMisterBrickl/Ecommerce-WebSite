const express = require("express");
const router = express.Router()
const Product = require("../models/products")
const ObjectId = require('mongo-objectid');
const multer  = require('multer');
const path = require("path");
const list = require("../app")

const date = Date.now()
let originalName = ""
let patthPhoto = ""

const storage = multer.diskStorage({
    destination:"/licenta/Licenta/src/assets/images/",
    filename: function(req,photo, cb){
        originalName = photo.originalname
        patthPhoto = path.extname(photo.originalname)
        cb(null, photo.originalname + '-' + date +
        path.extname(photo.originalname))
    }
})

const upload = multer({storage:storage})

router.post("/addProduct",upload.single("photo"),(req, res, next) =>{
    const product = new Product({
        title: req.body.title ,
        price: req.body.price,
        specification: req.body.specification,
        photo: "../../src/assets/images/" + originalName + '-' + date + patthPhoto, 
        quantity: parseInt(req.body.quantity),
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
    Product.find().then(posts =>{
        res.status(200).json({
            posts
          })
          
    })  
})

// router.post("/updateProduct",(req,res,next)=>{
//     const product = new Product({
//         title: req.body.title ,
//         price: req.body.price,
//         specification: req.body.specification,
//         photo: "../../src/assets/images/" + originalName + '-' + date + patthPhoto, 
//         quantity: parseInt(req.body.quantity),
//         type: req.body.type,
//     })

//     Product.findByIdAndUpdate(list[1],product,(error, data)=>{
//         if(error){
//             console.log(error)
//         }
//         else{
//             console.log(data)
//         }
//     })


// })



module.exports = router; 