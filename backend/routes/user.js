const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require("../models/users")
const Auth = require("../models/auth")
const jwt = require("jsonwebtoken");
const Product = require("../models/products")
const ObjectId = require('mongo-objectid');
const { data } = require("jquery");




router.post("/register", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
         const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email,
            category: 1
    });
   
    user.save()
        .then(result=>{
        res.status(201).json({
            message: 'User Created',
            result: result
        });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      })
    })
  })
});

router.post("/adminRegister", (req, res, next) =>{
  bcrypt.hash(req.body.password, 10)
      .then(hash => {
       const user = new User({
          username: req.body.username,
          password: hash,
          email: req.body.email,
          category: 0
  });
  user.save()
      .then(result=>{
      res.status(201).json({
          message: 'User Created',
          result: result
      });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
})
});


router.post('/getRole', (req,res)=>{

  Auth.find().then(result=>{
    if(result.length < 1){
      res.status(401).json({
        message:"Cant find"
      })
    }
    else{
      res.status(200).json({
        role: result[0].type
      })
    }
    
  })
})



router.post("/login", (req, res, next)=>{
  let fetchedUser
  User.findOne({email: req.body.email, username: req.body.username}).then(user=>{
     if(!user){
       return res.status(401).json({ 
         message: "Auth Fail"
       });
     }
     fetchedUser = user
     return bcrypt.compare(req.body.password, user.password)

   }).then(result=>{
     if(!result){
       return res.status(401).json({
         message: "Auth Fail"
       })
     }
     console.log(fetchedUser)
     const token = jwt.sign({email: fetchedUser.email, userId: fetchedUser._id},
      "secret_this_should_be_longer",
      {expiresIn: '1h'}
      )
      const auth = new Auth({
        username:fetchedUser.username,
        type: fetchedUser.category,
        token: token
      })
      auth.save()

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        category: fetchedUser.category,
      })
   })
   .catch(err => {
     return res.status(401).json({
       message: "Auth Fail"
     })
   })
})

router.post("/findUser", (req,res)=>{
  Auth.find().then(result=>{
    if(result.length < 1){
      
      res.status(401).json({
        message:"Cant find"
      })
    }
    else{
      res.status(200).json({
        result: result[0].username
      })
    }
    
  })
})


router.post('/destroyCart', (req,res)=>{
  console.log(req.body.result
    )
  User.findOne({username:req.body.result}).then(oldUser => {
    let user = new User({
      _id: oldUser._id,
      username: oldUser.username,
      password: oldUser.password,
      email: oldUser.email,
      category: oldUser.category,
      cart: []
  })
  console.log(user)
  User.findByIdAndUpdate({_id: user._id}, user, (error, data)=>{
    if(error){
        console.log(error)
    }
    else{
        console.log("Succesful" + data)
    }
    })
  })
})


router.post('/addToCart', (req, res)=>{
  let productId = req.body[0]._id
  User.findOne({username: req.body[1].result}).then(oldUser =>{
    let newCart = oldUser.cart

    Product.findOne({_id: productId}).then(product =>{
      
      newCart.push(product)
      let user = new User({
        _id: oldUser._id,
        username: oldUser.username,
        password: oldUser.password,
        email: oldUser.email,
        category: oldUser.category,
        cart: newCart
    })
  
    User.findByIdAndUpdate({_id: oldUser._id},user,(error, data)=>{
      if(error){
          console.log(error)
      }
      else{
          console.log("Succesful" + data)
      }
  })
    })

    })
})


router.get('/getCart/:response', (req, res)=>{
  User.findOne({username: req.params.response}).then(data =>{
    res.status(200).json({
      result: data.cart
    })
  })
})



router.post("/getNumberOfProducts", (req, res) =>{
  User.findOne({username: req.body.result}).then(data =>{
      res.status(200).json({
        result: data.cart
      })
  })
})


// FormSchema.updateOne({formName: name}, {$pull: {fields: {fieldName: fieldName}}}).exec();

router.post("/removeProduct", (req,res) =>{
  // console.log(req.body[1].result)

  User.findOne({username: req.body[1].result}).then(data =>{
    let ct = 0
    let newCart = []
    // console.log(ata.cart)
    for(let i of data.cart){
      if(i.title != req.body[0].title){
        console.log(i)
        newCart.push(i)
      }
      else{
        if(i.title == req.body[0].title && ct==1){
          newCart.push(i)
        }
        else{ ct++}
      }
    }
    // console.log(newCart)
    let newData ={
      _id: data._id,
      username: data.username,
      password: data.password,
      email: data.email,
      category: data.category,
      cart: newCart
      
    }
    User.findByIdAndUpdate({_id: data._id}, newData,(error, data)=>{
      if(error){
          console.log(error)
      }
      else{
          console.log("Succesful" + data)
      }
    })
  })
  
  // User.findOne({username: req.body[1].result}).then(data =>{
    
  //   data.cart.pull(req.body[0].title)
  //   // console.log( new ObjectId( req.body[0]._id))
  //   // console.log(data.cart)
  //   return data.save().then(data => res.send(data))
  // })
})


router.post("/logout", (req, res)=>{

  Auth.deleteMany({}).then(result=>{
    if(!result){
      res.status(400).json({
        message: "cant find user"
      })
    res.status(200).json({
      message: "succesfull"
    })
  }
})
})



module.exports = router;                      