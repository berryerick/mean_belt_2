// *7* replace 'appointments' with your app_name

// user factory
appointments.factory('userFactory', function($http, $location, $routeParams){
  var factory = {}
  // factory.appointments = []


  // factory.currUser = {}

  factory.index = function(){
    $http.get('/users').success(function(output){
      console.log();
    })
    return factory.users
  }
  factory.create = function(info, callback){
    console.log('in userFactory create method with info:', info)
    $http.post('/users', info).success(function(output){
      console.log('post to /users output: ', output);
      factory.currUser = output
      console.log("CURRUSER ", factory.currUser);
      $location.path('/')
      callback(factory.currUser)
    })
    // users.push(info)
  }

  factory.show = function(info, callback){
    console.log('in userfactory show method:', info);
    $http.get('/users/' + info).success(function(output){
      console.log('get to /users/id output: ', output);
      callback(output)
    })

  }
  factory.logout = function(){
    factory.currUser = null
    $location.path('/')
  }
  factory.login = function(callback){
    callback()
  }

  return factory
})

appointments.factory('appointmentFactory', function($http, $location, $routeParams){
  var factory = {}
  factory.get_appointments = function(callback){
    $http.get('/appointments').success(function(output){
      console.log("all appointments", output);
      var date = new Date()
      date = date.toISOString()
      for (var i = 0; i < output.length; i++) {
        // console.log(output[i].date);
        // console.log(date);
        if (output[i].date < date) {
          console.log("fjkldsa;fjkdls;ajdkl;fjklds;ajfklsda;jfkl;sdafjkl");
          output.splice(i,1)
          i--
          console.log("djfkl;dasjkfl;asjklf;adjskl;",output);
        }
      }
      factory.appointments = output
      callback(factory.appointments)
    })

  }

  factory.create = function (info, callback) {
    // info.patient = factory.currUser['_id']
    console.log('in AC create with', info);
    $http.post("/appointments", info).success(function(output){

      callback(output)
      if (output.success) {
        factory.get_appointments()
        $location.path('/')
      }
    })
  }
  factory.delete = function (appointment, callback){
    console.log("destroying: " , appointment);
    $http.post("/appointments/" +appointment + "/destroy")
    for (var x  in factory.appointments) {
      console.log(factory.appointments[x]);
      if (factory.appointments[x]._id == appointment) {
        factory.appointments.splice(x,1)
      }
    }
    callback(appointment)
  }

  return factory
})
