// import mongoose
var mongoose = require('mongoose');
var Schema = mongoose.Schema

//create schema
var appointmentSchema = new mongoose.Schema({
  //schema validations and setup goes here
  date: {type: Date, required: true},
  time: {type: Date, required: true},
  complaint: {type: String, required: true, minlength: 10,},
  patient: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, {timestamps: true})

// create model from schema
var Appointment = mongoose.model('Appointment', appointmentSchema)
