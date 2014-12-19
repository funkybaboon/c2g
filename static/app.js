var myApp = angular.module('myApp',['ngRoute']);

myApp.controller('c2gController', ['$scope', function($scope) {
	    
    $scope.vendor = "car2go Black";
    $scope.distance = 10;
    $scope.time = 20;
    $scope.time_standing = 0;
    $scope.airport = false;

    $scope.fee_day = 49;
    $scope.fee_hour = 14.9;
    $scope.fee_minute = 0.29;

    $scope.fee_simplekm = 0.29;
    $scope.fee_additionalkm = 0.58;

    $scope.getDays = function( minutes ) {
        return Math.floor(minutes / 1440);
    }

    $scope.getHours = function( minutes ) {
        return Math.floor((minutes - ($scope.getDays( minutes ) * 1440))/ 60);
    }

    $scope.getMinutes = function( minutes ) {
        return minutes % 1440 % 60;
    }

    $scope.getFreeKm = function( minutes ) {
        var freeKm = 50;
        if( $scope.getDays( minutes) > 0 ) {
            freeKm = $scope.getDays( minutes ) * 100;
        };
        return freeKm;
    }

    $scope.getSimpleKm = function( km, minutes ) {
        var simpleKm = km;
        var freeKm = $scope.getFreeKm( km, minutes );
        if( km > freeKm ) {
            simpleKm = freeKm;
        }
        return simpleKm;
    }

    $scope.getAdditionalKm = function( km, minutes ) {
        var AdditionalKm = 0;
        var freeKm = $scope.getFreeKm( km, minutes );
        if( km - freeKm > 0 ) {
            AdditionalKm = km - freeKm;
        }
        return AdditionalKm;
    }

    $scope.getFee_simpleKm = function( km, minutes ) {
        return $scope.getSimpleKm( km, minutes ) * $scope.fee_simplekm;
    }

    $scope.getFee_additionalKm = function( km, minutes ) {
        return $scope.getAdditionalKm( km, minutes ) * $scope.fee_additionalkm;
    }


    $scope.getFeeDays = function( minutes ) {
        return Math.floor(minutes / 1440) * $scope.fee_day;
    }

    $scope.getFeeHours = function( minutes ) {
        return Math.floor((minutes - ($scope.getDays( minutes ) * 1440))/ 60) * $scope.fee_hour;
    }

    $scope.getFeeMinutes = function( minutes ) {
        return minutes % 1440 % 60 * $scope.fee_minute;
    }

    $scope.getFeeStanding = function( minutes ) {
        return minutes * 0.19;
    }

    $scope.getFeeAirport = function( airport ) {
        fee = 0;
        if( airport ){
            fee = 4.90;
        }
        return fee;
    }

    $scope.price = function( km, minutes, time_standing, airport) {
        return (
            $scope.getFee_simpleKm( km, minutes ) + 
            $scope.getFee_additionalKm( km, minutes ) + 
            $scope.getFeeDays( minutes ) + 
            $scope.getFeeHours( minutes ) + 
            $scope.getFeeMinutes( minutes ) + 
            $scope.getFeeStanding( time_standing ) + 
            $scope.getFeeAirport( airport )
        );
    }
}]);

myApp.controller('c2gbController', ['$scope', function($scope) {
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
      when('/c2gb', {
        templateUrl: 'partials/c2gb.html',
        controller: 'c2gbController'
      }).
      when('/sm', {
        templateUrl: 'partials/sm.html',
        controller: 'smController'
      }).
      otherwise({
        redirectTo: '/c2g'
      });
  }]);

