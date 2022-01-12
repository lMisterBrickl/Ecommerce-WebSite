const express = require("express");
const User = require("../backend/models/users");
const mongoose = require("mongoose");
const cors = require('cors')
const userRoutes = require("./routes/user");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")


app = express();


mongoose.connect('mongodb://localhost:27017/Licenta', function(err){
  if(err){
    console.log("Failed to connect" + err)
  }else{
    console.log("You are connected to db")
  }
})

  app.use(express.json());
  app.use(express.urlencoded({extended:true}))
  app.use(cors())

//  app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PATCH, PUT, DELETE, OPTIONS"
//   );
//   next();
// });



app.use('/api/posts',(req,res,next) =>{
  const posts = [{
    id: '01',
    title: 'Tv Samsung',
    price: '1500',
    specification: 'diagonala 56 inch',
    photo: '../../assets/images/TV.jpg',
    quantity: 1
  },
  {
    id: '02',
    title: 'Iphone 12',
    price: '3000',
    specification: '128gb',
    photo: '../../assets/images/iphone12.jpg',
    quantity: 1
  },
  {
    id: '03',
    title: 'Pc Gaming',
    price: '3500',
    specification: 'i5 11600 gtx 1660',
    photo: '../../assets/images/pcscump.jpg',
    quantity: 1
  }]
  res.status(200).json({
    message: "Posts fetched succesfully",
    posts: posts
  })
  next();
})

 app.use("/api", userRoutes); 

// app.use('/api/register',(res,req,next) => {
//   bcrypt.hash(req.body.password, 10)
//   .then(hash=>{
//     const user = new User({
//       username: req.body.username,
//       password: hash,
//       email: req.body.email
//     });
//     user.save()
//     .then(result=>{
//       res.status(201).json({
//         message: 'User Created',
//         result: result
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       })
//     })
//   })
//   next()
// })
module.exports = app;
