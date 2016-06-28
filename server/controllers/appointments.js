var mongoose = require('mongoose');
// replace "Appointment" with your model name
var Appointment = mongoose.model('Appointment')
var User = mongoose.model('User')


module.exports = (function(){
  return{
    index: function(req,res){
      Appointment.find({}).populate("patient").sort('date').exec(function(err, appointments){
        if (err) {
          console.log(err);
        } else {
        console.log("requested Appointment", appointments);
        res.json(appointments)
        }
      })
    },

    create: function(req, res){
      console.log('in appointments.js create method with: ', req.body);
      Appointment.find({date: req.body.date}, function(err, data){ //check for existing data
        if (err) {
          console.log(err);
        } else {
          var date = new Date()
          if (req.body.date < date) {
            res.json({success: false, errors: ["date must be in the future"]})
          }
          else if (data.length < 3) { //if name doesn't exist
            var appointment = new Appointment(req.body)
            appointment.save(function(err, appointment){ //create data
              if (err) {
                console.log(err.message);
                res.json({success: false, errors: ["complaint must be at least 10 characters"]})

              } else {
                res.json({success: true, entry: appointment})
              }
            })
          } else { //if name exists send it to the requesting entity
            res.json({success: false, errors: ["there are already 3 appointments on that date"]})
          }
          console.log('find user data: ', data);
        }
      })
    },
    update: function(req, res){},
    show: function(req, res){
      console.log("in Appointment show:", req.params.id);
      Appointment.findOne({_id: req.params.id}).populate("other-model").exec(function(err, question){
        console.log("requested Appointment", Appointment);
        res.json(question)
      })
    },
    destroy: function(req, res){
      console.log(req.params.id);
      Appointment.findOne({_id: req.params.id}).remove(function(){
        console.log("hello");
        res.json(req.params.id)
      })
    },
    //non restful
    like: function(req, res){
      console.log("in Appointment like function",req.params.id);
      Appointment.update({_id: req.params.id}, {$inc: {likes: 1}}, function(err){
        if(err) console.log(err)
        else {
          // console.log("Questions index data: ", data)
          // res.json(Answer.findOne({_id: req.params.id}))
        }
      })
    }

  }
})()
