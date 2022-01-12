const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router()
const User = require("../models/users")
const jwt = require("jsonwebtoken")


router.post("/register", (req, res, next) =>{
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
         const user = new User({
            username: req.body.username,
            password: hash,
            email: req.body.email
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


router.post("/login", (req, res, next)=>{
  let fetchedUser
  User.findOne({email: req.body.email}).then(user=>{
    
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
      res.status(200).json({
        token: token,
        message: "Auth Succesfully"
      })
   })
   .catch(err => {
     return res.status(401).json({
       message: "Auth Fail"
     })
   })
})



module.exports = router;                      