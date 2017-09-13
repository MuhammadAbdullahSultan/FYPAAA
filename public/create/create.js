/*global angular*/
var app = angular.module('create', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/create', {
        templateUrl: 'create/create.html',
        controller: 'createUserCtrl'
    });
}]);

app.controller('createUserCtrl', ['$scope', '$rootScope', '$firebaseObject', 'Auth', function ($scope, $rootScope, $firebaseObject, Auth) {
    $scope.createUser = function() {
      $scope.message = null;
      $scope.error = null;

      // Create a new user
      Auth.$createUserWithEmailAndPassword($scope.email, $scope.password)
        .then(function(firebaseUser) {
          $scope.message = "User created with uid: " + firebaseUser.uid;
        }).catch(function(error) {
          $scope.error = error;
        });
    };
}]);