var mongoose = require('mongoose');
var User = mongoose.model('User')


module.exports = (function(){
  return{
    index: function(req,res){
      User.find({}, function(err, results) {
        if (err) {
          console.log(err);
        } else {
          res.json(results)
        }
      })
    },

    create: function(req, res){
      console.log('in users.js create method with: ', req.body);
      User.find({name: req.body.name}, function(err, data){ //check for existing name
        if (err) {
          console.log(err);
        } else {
          if (data.length == 0) { //if name doesn't exist
            var user = new User(req.body)
            user.save(function(err, user){ //create name
              if (err) {
                console.log(err);
              } else {
                res.json(user)
              }
            })
          } else { //if name exists send it to the requesting entity
            res.json(data[0])
          }
          console.log('find user data: ', data);
        }
      })
    },
    update: function(req, res){},
    show: function(req, res){
      console.log("in User show:", req.params.id);
      User.findOne({_id: req.params.id}).exec(function(err, user){
        console.log("requested user", user);
        res.json(user)
      })
    },    destroy: function(req, res){},

  }
})()
