/*global angular*/
var app = angular.module('maintain', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/maintain', {
        templateUrl: 'maintain/maintain.html',
        controller: 'maintainCtrl'
    });
}]);

app.controller('maintainCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    
    'use strict';
    $scope.message;
    $scope.writeUserData = function () {
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
        }
        
        if (document.getElementById('equi').value == "") {
            alert("Please fill out the equipment");
        }
        
        
        else {
            $scope.message = "The equipment has been added to the system"
        }
        firebase.database().ref('data/' + $scope.system + '/equipments').child($scope.equipment).set({
            equipment: $scope.equipment,
            description: $scope.desc
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
    $('#myModal').modal('hide');
    $('body').removeClass('modal-open');
    $('.modal-backdrop fade in').remove();
function edit_row(no)
{
 document.getElementById("edit_button"+no).style.display="none";
 document.getElementById("save_button"+no).style.display="block";
	
 var name=document.getElementById("name_row"+no);
 var country=document.getElementById("country_row"+no);
 var age=document.getElementById("age_row"+no);
 var group=document.getElementById("group_row"+no);
	
 var name_data=name.innerHTML;
 var country_data=country.innerHTML;
 var age_data=age.innerHTML;
 var group_data=group.innerHTML;
	
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"'>";
 country.innerHTML="<input type='text' id='country_text"+no+"' value='"+country_data+"'>";
 age.innerHTML="<input type='text' id='age_text"+no+"' value='"+age_data+"'>";
 group.innerHTML="<input type='text' id='group_text"+no+"'value='"+group_data+"'>";
}

function save_row(no)
{
 var name_val=document.getElementById("name_text"+no).value;
 var country_val=document.getElementById("country_text"+no).value;
 var age_val=document.getElementById("age_text"+no).value;
 var group_val=document.getElementById("group_text"+no).value;

 document.getElementById("name_row"+no).innerHTML=name_val;
 document.getElementById("country_row"+no).innerHTML=country_val;
 document.getElementById("age_row"+no).innerHTML=age_val;
 document.getElementById("group_row"+no).innerHTML=group_val;

 document.getElementById("edit_button"+no).style.display="block";
 document.getElementById("save_button"+no).style.display="none";
}

function delete_row(no)
{
 document.getElementById("row"+no+"").outerHTML="";
}

function add_row()
{
 var new_name=document.getElementById("new_name").value;
 var new_country=document.getElementById("new_country").value;
 var new_age=document.getElementById("new_age").value;
 var new_group=document.getElementById("new_group").value;
	
 var table=document.getElementById("data_table");
 var table_len=(table.rows.length)-1;
 var row = table.insertRow(table_len).outerHTML="<tr id='row"+table_len+"'><td id='name_row"+table_len+"'>"+new_name+"</td><td id='country_row"+table_len+"'>"+new_country+"</td><td id='age_row"+table_len+"'>"+new_age+"</td><td id='group_row"+table_len+"'>"+new_group+"</td><td><input type='button' id='edit_button"+table_len+"' value='Edit' class='edit' onclick='edit_row("+table_len+")'> <input type='button' id='save_button"+table_len+"' value='Save' class='save' onclick='save_row("+table_len+")'> <input type='button' value='Delete' class='delete' onclick='delete_row("+table_len+")'></td></tr>";

 document.getElementById("new_name").value="";
 document.getElementById("new_country").value="";
 document.getElementById("new_age").value="";
 document.getElementById("new_group").value="";
}