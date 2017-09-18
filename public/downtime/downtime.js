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
    
    $scope.onEquipmentChange = function(item){
   // once user is selected equipment, we take 1st key from second list
    var key =  Object.keys($scope.add[$scope.currentEquipment].equipments)[0]

    $scope.currentSystem = $scope.add[$scope.currentEquipment].equipments[key].system;   
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
                console.log($scope.add);
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
        
        $('#datetimepickerSearch').datetimepicker({
            viewMode: 'years',
            format: 'MM/DD/YYYY'
        });
        
        
        $("#datetimepicker1").on("dp.change", function() {

        $scope.startDT = $("#datetimepicker1").val();

    });
        
        $("#datetimepicker3").on("dp.change", function() {

        $scope.endDT = $("#datetimepicker3").val();

    });
        
        $("#datetimepickerSearch").on("dp.change", function() {

        $scope.start = $("#datetimepickerSearch").val();

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

