/*global angular*/
var app = angular.module('maintain', ['ngRoute', 'firebase']);

app.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider.when('/maintain', {
        templateUrl: 'maintain/maintain.html',
        controller: 'maintainCtrl'
    });
}]);

app.filter("offset", function () {
	return function (input, start) {
        if (!input || !input.length) { return; }
		start = parseInt(start, 10);
		return input.slice(start);
	};
});

app.controller('maintainCtrl', ['$scope', '$firebaseObject', '$firebaseArray', function ($scope, $firebaseObject, $firebaseArray) {
    $scope.unitsInPage = 6;
	$scope.currentPage = 0;
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
        firebase.database().ref('AllEquipments/' + $scope.equipment).set({
            system: $scope.system,
            description: $scope.desc,
            group: $scope.group
            
        });
};
    
    
        var ref = firebase.database().ref();
        var data = ref.child("AllEquipments");
        var list = $firebaseArray(data);
        
        list.$loaded().then(function(data) {
            $scope.data = data;
            console.log($scope.data);
            console.log($scope.data.length);
            angular.forEach ($scope.data , function (d) {
        $scope.equipment1 = d.$id;
        angular.forEach (d.system, function (e) {
            console.log(e);
            $scope.system1 = e
            if ($scope.equipmentt == e.equipment) {
                $scope.error = "Cannot add the same equipment again";
            }
        })
    });
        }).catch(function(error) {
            $scope.error = error;
        });
    
    //Count how many pages needed to display all students
    // return 10 in this case: students.length = 50 & unitsInPage = 5
	$scope.pageCount = function() {
		return Math.ceil($scope.data.length/$scope.unitsInPage) -1;
	};
    
    //setting number for pagination button to be display
	$scope.range = function () {
		var rangeSize = 3;
		var numForPagiBtns = [];
		var start = $scope.currentPage;
        var i;
        if(rangeSize > $scope.pageCount())
            {
                rangeSize = $scope.pageCount() + 1;
            }
		if (start > $scope.pageCount() - rangeSize ) {
			start = $scope.pageCount() - rangeSize + 1;
		}
		for (i=start; i<start + rangeSize; i++) {
			numForPagiBtns.push(i);
		}
        console.log(numForPagiBtns);
		return numForPagiBtns;
	};
    
    
    //Set the current page to the number pressed by user in pagination
	$scope.setPage = function(n) { 
		$scope.currentPage = n; 
	}; 
    
    //Some navigating function for pagination 
	$scope.prevPage = function() {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};
	$scope.prevPageDisabled = function() {
		return $scope.currentPage === 0 ? "disabled" : "";
	};
	$scope.nextPage = function() {
		if ($scope.currentPage < $scope.pageCount()) {
			$scope.currentPage++;
		}
	};
	$scope.nextPageDisabled = function() {
		return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
	};
    
    // Counting characters in text area.
    
    $("#textarea").keyup(function(){
  $("#count").text("Characters left: " + (100 - $(this).val().length));
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
	
 name.innerHTML="<input type='text' id='name_text"+no+"' value='"+name_data+"' data-ng-model='editEquipment'>";
 country.innerHTML="<input type='text' id='country_text"+no+"' value='"+country_data+"' data-ng-model='editSystem'>";
 age.innerHTML="<input type='text' id='age_text"+no+"' value='"+age_data+"' data-ng-model='edit'>";
 group.innerHTML="<input type='text' id='group_text"+no+"'value='"+group_data+"' data-ng-model='editEquipment'>";
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