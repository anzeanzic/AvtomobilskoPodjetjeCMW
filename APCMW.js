angular.module('APCMW', []);
angular.module('APCMW').controller('HttpController', function($scope, $http) {
	$scope.carsArray = [];
	$scope.timeslotsArray = []; // javascript map recimo -> gledaš kater termin je vezan na avto (ng-repeat v ng-repeat)
	GetCars();

    $scope.reserveTimeslot = function(timeslotID) {
    	$http.post('http://smartninja.betoo.si/api/CMW/reservations', { timeslotId: timeslotID, email: "test@gmail.com" }).success(function(data, status, headers, config) {

    	}).error(function(data, status, headers, config) {

    	});
    }

    function GetTimeslots() {
	    $http.get('http://smartninja.betoo.si/api/CMW/timeslots')
	    .success(function(data, status, headers, config)
	    {
	    	$scope.timeslotsArray = data;
	    })
	    .error(function(data, status, headers, config)
	    {
	    	alert("Ne dela"); // TODO
	    });
    }

    function GetCars() {
	    $http.get('http://smartninja.betoo.si/api/CMW/cars')
	    .success(function(data, status, headers, config)
	    {
	    	$scope.carsArray = data;
	    	GetTimeslots();
	    })
	    .error(function(data, status, headers, config)
	    {
	    	alert("Ne dela"); // TODO
	    });
    }

    // TODO: naredil filter, select, karkoli
    // TODO: poglej, ce je skupina undefined
});

// Uporabljaj POSTMAN - Chrone extension

/*
DN
Sproti pokaži rezultat loterije


chain promise
*/
