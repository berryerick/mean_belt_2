// import mongoose
var mongoose = require('mongoose');

//create schema
var userSchema = new mongoose.Schema({
  //schema validations and setup goes here
  name: {type: String, required: true, unique: true},

},{timestamps: true})

// create model from schema
mongoose.model('User', userSchema)
