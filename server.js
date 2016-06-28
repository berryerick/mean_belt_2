// *1* npm install to install express mongoose and body-parser
// *2* create server.js:
// *3* see client/index.html

//requires exxpress app
var express = require('express');
// requires path for
var path = require('path');
//create app:
var app = express();
var bodyParser = require('body-parser');
// set up a static file server pointing to client directory
app.use(express.static(__dirname + '/client'))
app.use(bodyParser.json())

//connect to mongoose.js config file
require('./server/config/mongoose.js')
// connect routes file
require('./server/config/routes.js')(app)

app.listen(8000, function(){
  console.log('running on 8000')
})
