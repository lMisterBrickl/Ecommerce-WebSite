const express = require("express");
const User = require("../backend/models/users");
const mongoose = require("mongoose")
app = express();


mongoose.connect('mongodb://localhost:27017/Licenta', function(err){
  if(err){
    console.log("Failed to connect" + err)
  }else{
    console.log("You are connected to db")
  }
})


app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin","*")
  res.setHeader("Access-Control-Allow-Header","Origin, X-Requested-With, Content-Type, Accept")
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS")
  next()
})



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


app.post('/api/users',(res,req,next) => {
  var user = new User();
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.save()

})


module.exports = app;
