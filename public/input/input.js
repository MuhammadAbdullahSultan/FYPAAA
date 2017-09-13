/*global angular*/
var app = angular.module('input', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/input', {
        templateUrl: 'input/input.html',
        controller: 'inputCtrl'
    });
}]);

app.controller('inputCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    'use strict';
    
    $scope.message;
    $scope.writeUserData = function (equipment, desc) {
        var doesExist = false;
        angular.forEach ($scope.data , function (d) {
        angular.forEach (d.equipments, function (e) {
            console.log(e);
            if ($scope.equipment == e.equipment) {
                $scope.error = "Cannot add the same equipment again";
                doesExist = true;
            }
        })
    });
        if(doesExist) {
            return;
        } else {
            $scope.message = "The equipment has been added to the system"
        }
        firebase.database().ref('data/' + $scope.system + '/equipments').child(equipment).set({
            equipment: equipment,
            description: desc
        });
};
    
    
        var ref = firebase.database().ref();
        var data = ref.child("data");
        var list = $firebaseArray(data);
        
        list.$loaded().then(function(data) {
            $scope.data = data;
            console.log($scope.data);
        }).catch(function(error) {
            $scope.error = error;
        });
    
    angular.forEach ($scope.data , function (d) {
        angular.forEach (d.equipments, function (e) {
            if ($scope.equipmentt == e.equipment) {
                $scope.error = "Cannot add the same equipment again";
            }
        })
    });
        
        
    
}]);