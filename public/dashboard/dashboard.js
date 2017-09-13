/*global angular*/
var app = angular.module('dashboard', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/dashboard', {
        templateUrl: 'dashboard/dashboard.html',
        controller: 'searchCtrl'
    });
}]);

app.controller('searchCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    'use strict';
    
    var ref = firebase.database().ref();
        var data = ref.child("data");
        var list = $firebaseArray(data);
        
        list.$loaded().then(function(data) {
            $scope.data = data;
            console.log($scope.data);
        }).catch(function(error) {
            $scope.error = error;
        });
    
    $scope.onSystemChange = function(item){
   // once user is selected system, we take 1st key from second list
   var key =  Object.keys($scope.data[$scope.currentSystem].equipments)[0]

    $scope.currentEquipment = 
    $scope.data[$scope.currentSystem].equipments[key].equipment;   
  }
}]);