var users = require('./../controllers/users.js') // require users controller
var appointments = require('./../controllers/appointments.js') // require users controller

module.exports = function(app){
  app.get('/users', function(req, res){
    users.index(req, res)
  }),
  app.get('/appointments', function(req, res){
    appointments.index(req, res)
  }),
  app.post('/users', function(req, res){
    users.create(req, res)
  }),
  app.post('/appointments', function(req, res){
    appointments.create(req, res)
  }),
  app.post('/appointments/:id/destroy', function(req, res){
    appointments.destroy(req, res)
  })

}
