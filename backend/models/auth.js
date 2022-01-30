const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const authSchema = mongoose.Schema({
    username: {type:String},
    type:{type:Number},
    token:{type: String}
   
})

authSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Auth',authSchema)