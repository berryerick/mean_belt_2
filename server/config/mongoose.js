// *replace DB_NAME with your dataBase_Name*


var mongoose = require('mongoose')
var fs = require('fs') // file system so we can load all the model files

// create/connect to db
mongoose.connect('mongodb://localhost/appointments')

// read all models files
var models_path = __dirname + '/../models'
fs.readdirSync(models_path).forEach(function(file){
  if (file.indexOf('.js') > 0) {
    require(models_path + '/' + file)
  }
})
