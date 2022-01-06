const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  username: { type: String, require:true, unique:true, lowecase:true},
  email: { type: String, require:true, unique:true, lowecase:true},
  password: { type: String, require:true},
  address  : { type: String, require:true},
  // cart: {type: Any}
})

module.export = mongoose.model('User', userSchema)
