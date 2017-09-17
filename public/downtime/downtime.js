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
    $scope.notEmptyOrNull = function(item){
  return !(item.name_fr === null || item.name_fr.trim().length === 0)
}
     $scope.allEquipments = [];
     $scope.allSystems = [];
     $scope.allDT = [];
    
    $scope.manageDowntime = function () {
        
        var doesExist = false;
        angular.forEach ($scope.data , function (d) {
        angular.forEach (d.equipments, function (e) {
        })
    });
        firebase.database().ref('downtime/' + $scope.addEquipment).push({
            equipment: $scope.addEquipment,
            type : $scope.type,
            start: $scope.startDT,
            end: $scope.endDT
        });
        
        var key = firebase.database().ref.key;
        console.log(key);
        
};
    
        var ref = firebase.database().ref();
        var data = ref.child("AllEquipments");
        var list = $firebaseArray(data);
        
        // for adding
        list.$loaded().then(function(data) {
                $scope.add = data;
                angular.forEach ($scope.add , function (d) {

                  $scope.allSystems.push(d.$id);  

                    angular.forEach (d.equipments, function (e) {
                        $scope.allEquipments.push(e.equipment);
                    })
                });
                console.log($scope.add);
            }).catch(function(error) {
                $scope.error = error;
            });
         // for searching
        list.$loaded().then(function(data) {
            $scope.data = data;
            angular.forEach ($scope.data , function (d) {
                
              $scope.allSystems.push(d.$id);  
                
                angular.forEach (d.equipments, function (e) {
                    $scope.allEquipments.push(e.equipment);
                })
            });
            console.log($scope.data);
        }).catch(function(error) {
            $scope.error = error;
        });
    
    //FOR DOWN TIME RETRIEVE
    
        var newref = firebase.database().ref();
        var dtdata = newref.child("downtime");
        var dtlist = $firebaseArray(dtdata);
    
        dtlist.$loaded().then(function(dtdata) {
                $scope.dtdata = dtdata;
                angular.forEach ($scope.dtdata , function (d) {
                    angular.forEach (d , function (e) {
                    $scope.allDT.push(e);
                    console.log(e);
                    
                })
                });
                
            }).catch(function(error) {
                $scope.error = error;
            });
            

    
    $(document).ready(function () {
    

        $('#datetimepicker1').datetimepicker({
            viewMode: 'years'
            
        }); 
        
        $('#datetimepicker3').datetimepicker({
            viewMode: 'years'
        }); 
        
        
        $("#datetimepicker1").on("dp.change", function() {

        $scope.startDT = $("#datetimepicker1").val();

    });
        
        $("#datetimepicker3").on("dp.change", function() {

        $scope.endDT = $("#datetimepicker3").val();

    });
        
});
    

}]);

app.directive('customzdatetime', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            element.datetimepicker({
                debug: false,
                format: 'DD-MM-YYYY hh:mm'
            }).on('dp.change', function (e) {
                ngModelCtrl.$setViewValue(e.date);
                scope.$apply();
            });
        }
    };
});

