angular.module('APCMW', []);
angular.module('APCMW').controller('HttpController', function($scope, $http) {
	$scope.error = false;
	$scope.cars = []; // hashmap
	GetCars();

    $scope.reserveTimeslot = function(timeslotID) {
    	var email = prompt("Please enter your email:");
    	if (email != null) {
	    	$http.post('http://smartninja.betoo.si/api/CMW/reservations', { timeslotId: timeslotID, email: email }).success(function(data, status, headers, config) {
	    		alert("Successfully reserved!");
	    	}).error(function(data, status, headers, config) {
	    		alert("Reservation failed. Please try again!");
	    	});
	    }
    }

    function GetTimeslots() {
	    $http.get('http://smartninja.betoo.si/api/CMW/timeslots')
	    .success(function(data, status, headers, config)
	    {
	    	for (var i = 0; i < data.length; i++) {
	    		if (data[i].carId in $scope.cars) {
	    			$scope.cars[parseInt(data[i].carId)].timeslots.push(data[i]);
	    		}
	    	}
	    })
	    .error(function(data, status, headers, config)
	    {
	    	$scope.error = true;
	    	$scope.errorDesc = 'Error getting data from server. Please try refreshing the site!';
	    });
    }

    function GetCars() {
	    $http.get('http://smartninja.betoo.si/api/CMW/cars')
	    .success(function(data, status, headers, config)
	    {
	    	for (var i = 0; i < data.length; i++) {
	    		$scope.cars[parseInt(data[i].id)] = data[i];
	    		$scope.cars[parseInt(data[i].id)].timeslots = [];
	    	}
	    	GetTimeslots();
	    })
	    .error(function(data, status, headers, config)
	    {
	    	$scope.error = true;
	    	$scope.errorDesc = 'Error getting data from server. Please try refreshing the site!';
	    });
    }

    // TODO: naredil filter, select, karkoli
});