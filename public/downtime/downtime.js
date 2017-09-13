/*global angular*/
var app = angular.module('downtime', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/downtime', {
        templateUrl: 'downtime/downtime.html',
        controller: 'downtimeCtrl'
    });
}]);

app.controller('downtimeCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    'use strict';
    
     $scope.allEquipments = [];
     $scope.allSystems = [];
    
    $scope.manageDowntime = function () {
        var doesExist = false;
        angular.forEach ($scope.data , function (d) {
        angular.forEach (d.equipments, function (e) {
        })
    });
        firebase.database().ref('downtime/' + $scope.equipment + '/downtime').child($scope.equipment).set({
            equipment: $scope.equipment,
            type : $scope.type,
            start: $scope.startDT,
            end: $scope.endDT
        });
};
    
    var ref = firebase.database().ref();
        var data = ref.child("data");
        var list = $firebaseArray(data);
        
        list.$loaded().then(function(data) {
            $scope.data = data;
            angular.forEach ($scope.data , function (d) {
                
              $scope.allSystems.push(d.$id);  
                
                angular.forEach (d.equipments, function (e) {
                    $scope.allEquipments.push(e.equipment);
                    console.log($scope.allEquipments);
                })
            });
            console.log($scope.data);
        }).catch(function(error) {
            $scope.error = error;
        });
    
    
}]);

