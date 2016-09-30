var app = angular.module('app', [
  'ngRoute',
  'ngAnimate'
]);

angular.module('app')
.controller('MainCtrl', [
  '$scope',
  function($scope){

  }
]);

angular.module('app')
.run(function ($rootScope, $location) {
  //var url = 'ws://localhost:3000';
  var url = "wss"+"://" + $location.host() + ":" + $location.port();
  console.log("Attempting to open Websocket in: "+url);
  var connection = new WebSocket(url);
  connection.onopen = function () {
    console.log('WebSocket connected to '+url);
  };
  connection.onclose = function (e) {
    console.log('WebSocket closed. Reconnecting...');
    $timeout(connect, 5*1000);
  };
  connection.onmessage = function (e) {
    var payload = JSON.parse(e.data);
    $rootScope.$broadcast('ws:' + payload.topic, payload.data);
  };
});

angular.module('app')
.service('AttendeesSvc', function($http){
  this.getAttendees = function(){
    return $http.get('/api/attendants');
  };

  this.addAttendee = function(attendant){
    return $http.post('/api/attendant', attendant);
  };

  this.removeAttendee = function(attendantId){
    return $http.delete('/api/attendant/'+attendantId);
  };
});

angular.module('app')
.controller('RegistrationCtrl', [
  '$scope',
  '$filter',
  'AttendeesSvc',
  function($scope, $filter, AttendeesSvc){
    AttendeesSvc.getAttendees().success(function(data){
      $scope.attendees = data;
    });
    $scope.addAttendee = function(){
      //$scope.attendees.push({name: $scope.attendee.name, email: $scope.attendee.email});
      AttendeesSvc.addAttendee({
        name: $scope.attendee.name,
        email: $scope.attendee.email
      }).success(function(newAttendee){
        //$scope.addToView(newAttendee);
        $scope.attendee.name = null;
        $scope.attendee.email = null;
      });
    };
    $scope.removeAttendee = function(attendeeId){
      AttendeesSvc
      .removeAttendee(attendeeId)
      .success(function(data){
        $scope.removeFromView(attendeeId);
      });
    };
    $scope.$on("ws:removed", function (_, removedAttendee) {
      $scope.$apply(function () {
        $scope.removeFromView(removedAttendee);
      });
    });
    $scope.$on("ws:inserted", function (_, insertedAttendee) {
      $scope.$apply(function () {
        $scope.addToView(insertedAttendee);
      });
    });
    $scope.removeFromView = function(attendeeId){
      nid = '!' + attendeeId;
      $scope.attendees = $filter('filter')($scope.attendees, {_id: nid});
    };
    $scope.addToView = function(newAttendee){
      $scope.attendees.push({
        name: newAttendee.name,
        email: newAttendee.email,
        _id: newAttendee._id
      });
    };
  }
]);

angular.module('app')
.controller('NavCtrl', [
  '$scope',
  '$location',
  function($scope, $location){
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
  }
]);

angular.module('app')
.controller('HomeCtrl', [
  '$scope',
  function($scope){

  }
]);

angular.module('app')
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    controller: 'HomeCtrl',
    templateUrl: 'home.html'
  })
  .when('/registration', {
    controller: 'RegistrationCtrl',
    templateUrl: 'registration.html'
  });
  $locationProvider.html5Mode(true);
});
