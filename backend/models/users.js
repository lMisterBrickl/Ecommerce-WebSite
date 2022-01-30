const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const userSchema = mongoose.Schema({
  username: { type: String, require:true, unique:true, lowecase:true},
  email: { type: String, require:true, unique:true, lowecase:true},
  password: { type: String, require:true},
  address  : { type: String, require:true},
  category:{ type:Number, require:true},
  cart: {type: Array}
})

userSchema.plugin(uniqueValidator)

module.exports = mongoose.model('User', userSchema)
