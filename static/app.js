var myApp = angular.module('myApp',['ngRoute']);

myApp.controller('c2gController', ['$scope', function($scope) {
	    
    $scope.vendor = "car2go";
    $scope.km = 10;
    $scope.time = 20;
    $scope.time_standing = 0;

    $scope.price = 0;

    $scope.airport = false;

    var fee_airport = 4.9;
    
    var fee_minute_standing = 0.19;
    var fee_minute_driving = 0.29;
    
    // additional fee per km after the first 50km
    var fee_additional_minute_driving = 0.29;
    
    var fee_hour_driving = 14.90;
    // after this many minutes you get billed an hour
    var hour_valid = Math.floor(fee_hour_driving / fee_minute_driving);

    var fee_day_driving = 49.00;
    // after this many minutes you get billed a day
    var day_valid = Math.floor(fee_day_driving / fee_minute_driving);

    // first 50km are always included
    var km_free = 50;
    // for one day you get 100 free km
    var km_free_day = 100;


    var timespan = function( minutes ) {
        var time = {
            days: 0,
            hours: 0,
            minutes: 0
        };
        time.days = Math.floor(minutes / day_valid);
        time.hours = Math.floor((minutes - (time.days * day_valid))/ hour_valid);
        time.minutes = minutes % day_valid % hour_valid;

        return time;
    };

    var timeprice = function( timespan) {
    	var day = timespan.days * fee_day_driving;
    	var hour = timespan.hours * fee_hour_driving;
    	var minute = timespan.minutes * fee_minute_driving;
	    console.log(day);
	    console.log(hour);
	    console.log(minute);
        return day + hour + minute;
    };

    var kmprice = function( distance, timespan) {
        var freekms = function( timespan ) {
            var free;
        
            if( timespan.days >= 1) {
                free = timespan.days * km_free_day;
                if( timespan.hours > 0 || timespan.minutes > 0){
                    free += km_free;
                }
            } else {
                free = km_free;
            }
            return free;
        };

        var realkms = distance - freekms(timespan);
        var price = distance * fee_minute_driving;
        if (realkms > 0){
               price += realkms * fee_additional_minute_driving;
        }
        return price;
    };

    var total = function( distance, minutes) {
        return (kmprice( distance, timespan(minutes)) + timeprice( timespan(minutes)));
    };

    // calcPro(km,time,airport) return Number
    $scope.updateprice = function () {
        $scope.price = total($scope.km,$scope.time);
        if( $scope.airport ) {
            $scope.price = $scope.price + fee_airport;
        }
    };
    
    var debugtimespan = 350;
    var debugdistance = 1;

	//console.log(timeprice( 20));

    $scope.debug = [ 
        hour_valid, 
        day_valid, 
        timespan(debugtimespan), 
        kmprice(debugdistance, debugtimespan),
        //timeprice(timespan(debugtimespan))
    ];

}]);


myApp.controller('smController', ['$scope', function($scope) {
}]);


myApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/c2g', {
        templateUrl: 'partials/c2g.html',
        controller: 'c2gController'
      }).
      when('/sm', {
        templateUrl: 'partials/sm.html',
        controller: 'smController'
      }).
      otherwise({
        redirectTo: '/c2g'
      });
  }]);

