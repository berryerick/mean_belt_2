
// appointment controller
appointments.controller('appointmentController', function(userFactory, appointmentFactory, $routeParams){
  console.log("in usersController");
  var date= new Date()
  this.date = date.toISOString()
  // this.date = date
  console.log(this.date, "%%%%%%%%%%%%%%%%%%%%%");
  var that    = this
  this.errors = []
  this.users  = []

  this.make_appointment = function() {
    console.log("in make_appointment method with: ", this.appointment);
    this.appointment.patient = this.currUser._id
    appointmentFactory.create(this.appointment, function(data){
      console.log('in appointemnt create callback with:', data);
      if (!data.success) {
        that.errors = []
        for (var x in data.errors) {
          that.errors.push(data.errors[x]);
        }
      }else {
        console.log("appointments post data:", data);
        // $location.path('/')
      }
    })
  }
  this.currUser = userFactory.currUser
  this.login = function(){
    this.currUser = userFactory.login(function(){
      if (!userFactory.currUser) {
        userFactory.create({name: prompt('Please enter your name:', 'your name here' )}, function(data){
          console.log('in login callback with: ', data);
          that.currUser = data
        })
      }else {
        that.currUser = userFactory.currUser
      }
    })
  }
  if (!this.currUser) {
    console.log('logging in!');
    this.login()
  }
  this.logout = function () {
    userFactory.logout()
    this.login()
  }
})

//dashboard controller
appointments.controller('dashController', function(userFactory, appointmentFactory){
  console.log('in dashController')
  var that = this
  this.errors = []
  this.currUser = userFactory.currUser
  this.get_appointments = function(){appointmentFactory.get_appointments(function(data){
    // console.log('hello?',data);
    that.appointments = data
  })}
  this.get_appointments()

  this.login = function(){
    this.currUser = userFactory.login(function(){
      if (!userFactory.currUser) {
        userFactory.create({name: prompt('Please enter your name:', 'your name here' )}, function(data){
          console.log('in login callback with: ', data);
          that.currUser = data
        })
      }else {
        that.currUser = userFactory.currUser
      }
    })
  }
  this.logout = function () {
    userFactory.logout()
    this.login()
  }
  if (!this.currUser) {
    this.login()
  }
  this.delete = function(appointment){
    appointmentFactory.delete(appointment, function(data){
      for (var x  in that.appointments) {
        console.log(that.appointments[x]._id );
        if (that.appointments[x]._id == data) {
          that.appointments.splice(x,1)
        }
      }
    })
  }
})
