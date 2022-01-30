const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require("../models/users")
const Auth = require("../models/auth")
const jwt = require("jsonwebtoken");
const Product = require("../models/products")




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

  User.findOne({username: req.body.username}).then(user=>{
    console.log(user)
    if(!user){
      return res.status(404).json({
        message:"404"
      })
    }
    return res.status(200).json({
        role: user.category
    })
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
    if(!result){
      res.status(401).json({
        message:"Cant find"
      })
    }
    res.status(200).json({
      result: result[0].username
    })
  })
})


router.post('/addToCart', (req, res)=>{
  let productId = req.body[0]._id
  User.findOne({username: req.body[1].result}).then(oldUser =>{
    let newCart = []
    Product.findOne({_id: productId}).then(oldCart =>{
      newCart.push(req.body[0])
      if(oldCart.cart != null){
        newCart.push(oldCart.cart)
      }
      
      console.log("newCart", newCart)
      let user = new User({
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