// *4* create angular module (replace 'appointments' with your app_name)
// *5* add routes below if needed)
// *6* go to controllers.js

var appointments = angular.module('appointments', ['ngRoute'])

appointments.config(function($routeProvider){
  $routeProvider
  .when('/new_appointment', {
    templateUrl: "/partials/new_appointment.html"
  })
  .when('/', {
    templateUrl: "/partials/dashboard.html"
  })
  .otherwise({
    redirectTo: '/'
  })
})
