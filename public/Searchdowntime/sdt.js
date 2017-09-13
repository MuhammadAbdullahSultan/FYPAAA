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
                })
            });
        }).catch(function(error) {
            $scope.error = error;
        });
   
    
    $(document).ready(function () {
    var date = new Date();
    var currentMonth = date.getMonth();
    var currentDate = date.getDate();
    var currentYear = date.getFullYear();

        $('#datetimepicker2').datetimepicker({
            viewMode: 'years'
        }); 
        $('#datetimepicker10').datetimepicker({
                viewMode: 'years',
                format: 'MM/YYYY'
            });
        $('#datetimepicker11').datetimepicker({
                viewMode: 'years',
                format: 'YYYY'
            });
     
//    $('#yearPicker').datepicker({
//        maxDate: new Date(currentYear, currentMonth, currentDate),
//        changeYear: true,
//        showButtonPanel: true,
//        dateFormat: 'yy',
//        onClose: function(dateText, inst) { 
//            var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//            $(this).datepicker('setDate', new Date(year, 1));
//            $(".date-picker-year").focus(function () {
//         $(".ui-datepicker-month").hide();
//         $(".ui-datepicker-date").hide();
//        });
//        }
//    });
});
    
//    $(function() {
//	$('.monthYearPicker').datepicker({
//		changeMonth: true,
//		changeYear: true,
//		showButtonPanel: true,
//		dateFormat: 'MM yy'
//	}).focus(function() {
//		var thisCalendar = $(this);
//		$('.ui-datepicker-calendar').detach();
//		$('.ui-datepicker-close').click(function() {
//        var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
//        var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
//        thisCalendar.datepicker('setDate', new Date(year, month, 1));
//                });
//            });
//        });
//    
//   
}]);
    

//app.filter("onChange" , function () {
//    
//});