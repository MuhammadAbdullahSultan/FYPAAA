/*global angular*/
var app = angular.module('sdt', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/sdt', {
        templateUrl: 'searchdowntime/sdt.html',
        controller: 'sdtCtrl'
    });
}]);

app.controller('sdtCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    'use strict';
    
    $scope.allSystems = [];
    $scope.allEquipments = [];
    var ref = firebase.database().ref();
        var data = ref.child("data");
        var list = $firebaseArray(data);
        
        list.$loaded().then(function(data) {
            $scope.data = data;
            angular.forEach ($scope.data , function (d) {
                angular.forEach (d.equipments, function (e) {
                    $scope.allSystems.push(d.$id);
                    $scope.allEquipments.push(e.equipment);
                    console.log($scope.allEquipments);
                    console.log($scope.allSystems);
                })
            });
        }).catch(function(error) {
            $scope.error = error;
        });
    
    $scope.onSystemChange = function(item){
       
  }
}]);

//app.filter("onChange" , function () {
//    
//});