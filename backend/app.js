const express = require("express");
const User = require("../backend/models/users").default;
const mongoose = require("mongoose");
const cors = require('cors')
const userRoutes = require("./routes/user");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser")
const productRoutes = require("./routes/product")



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



 app.use("/api", productRoutes);
 app.use("/api", userRoutes); 

module.exports = app;
