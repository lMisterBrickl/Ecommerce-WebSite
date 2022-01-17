const mongoose = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const productSchema = mongoose.Schema({
    title: {type:String, unique:true},
    price: {type:String},
    specification: {type:String},
    photo: {type:String},
    quantity: {type:String},
    type:{type:String},
})

productSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Product',productSchema)