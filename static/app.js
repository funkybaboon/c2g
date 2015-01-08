var myApp = angular.module('myApp', [
  'ngRoute',
  'angularMoment',
  'ui.bootstrap'
]);

myApp.controller('c2gController', ['$scope', function($scope) {

  $scope.vendor = 'car2go';
  $scope.distance = 10;
  $scope.time = 20;
  $scope.timeStanding = 0;
  $scope.airport = false;

  $scope.feeDay = 59;
  $scope.feeHour = 14.9;
  $scope.feeMinute = 0.29;

  $scope.feeAdditionalKm = 0.29;

  $scope.getDays = function(minutes) {
    return Math.floor(minutes / 1440);
  };

  $scope.getHours = function(minutes) {
    return Math.floor((minutes - ($scope.getDays(minutes) * 1440)) / 60);
  };

  $scope.getMinutes = function(minutes) {
    return minutes % 1440 % 60;
  };

  $scope.getFreeKm = function(minutes) {
    var freeKm = 50;
    if ($scope.getDays(minutes) > 0) {
      freeKm = $scope.getDays(minutes) * 100;
    }
    return freeKm;
  };

  $scope.getAdditionalKm = function(km, minutes) {
    var AdditionalKm = 0;
    var freeKm = $scope.getFreeKm(minutes);
    if (km - freeKm > 0) {
      AdditionalKm = km - freeKm;
    }
    return AdditionalKm;
  };

  $scope.getfeeAdditionalKm = function(km, minutes) {
    return $scope.getAdditionalKm(km, minutes) * $scope.feeAdditionalKm;
  };

  $scope.getFeeDays = function(minutes) {
    return Math.floor(minutes / 1440) * $scope.feeDay;
  };

  $scope.getFeeHours = function(minutes) {
    return (
      Math.floor((minutes - ($scope.getDays(minutes) * 1440)) / 60) *
      $scope.feeHour
    );
  };

  $scope.getFeeMinutes = function(minutes) {
    return minutes % 1440 % 60 * $scope.feeMinute;
  };

  $scope.getFeeStanding = function(minutes) {
    return minutes * 0.19;
  };

  $scope.getFeeAirport = function(airport) {
    fee = 0;
    if (airport) {
      fee = 4.90;
    }
    return fee;
  };

  $scope.price = function(km, minutes, timeStanding, airport) {
    return (
      $scope.getfeeAdditionalKm(km, minutes) +
      $scope.getFeeDays(minutes) +
      $scope.getFeeHours(minutes) +
      $scope.getFeeMinutes(minutes) +
      $scope.getFeeStanding(timeStanding) +
      $scope.getFeeAirport(airport)
    );
  };
}]);

myApp.controller('c2gbController', ['$scope', function($scope) {
  $scope.vendor = 'car2go Black';
  $scope.distance = 10;
  $scope.time = 20;
  $scope.airport = false;

  $scope.feeDay = 89;
  $scope.feeHour = 14.9;

  $scope.feeAdditionalKm = 0.29;

  $scope.getDays = function(minutes) {
    return Math.floor(minutes / 1440);
  };

  $scope.getHours = function(minutes) {
    return Math.ceil((minutes - ($scope.getDays(minutes) * 1440)) / 60);
  };

  $scope.getFreeKm = function(minutes) {
    var freeKm = 50;
    if ($scope.getDays(minutes) > 0) {
      freeKm = $scope.getDays(minutes) * 200;
    }
    return freeKm;
  };

  $scope.getAdditionalKm = function(km, minutes) {
    var AdditionalKm = 0;
    var freeKm = $scope.getFreeKm(minutes);
    if (km - freeKm > 0) {
      AdditionalKm = km - freeKm;
    }
    return AdditionalKm;
  };

  $scope.getfeeAdditionalKm = function(km, minutes) {
    return $scope.getAdditionalKm(km, minutes) * $scope.feeAdditionalKm;
  };

  $scope.getFeeDays = function(minutes) {
    return Math.floor(minutes / 1440) * $scope.feeDay;
  };

  $scope.getFeeHours = function(minutes) {
    return (
      Math.ceil((minutes - ($scope.getDays(minutes) * 1440)) / 60) *
      $scope.feeHour
    );
  };

  $scope.getFeeAirport = function(airport) {
    fee = 0;
    if (airport) {
      fee = 4.90;
    }
    return fee;
  };

  $scope.price = function(km, minutes, airport) {
    return (
      $scope.getfeeAdditionalKm(km, minutes) +
      $scope.getFeeDays(minutes) +
      $scope.getFeeHours(minutes) +
      $scope.getFeeAirport(airport)
    );
  };

}]);

myApp.factory('stadtMobilRates', function($q, $http) {
  var mobilRates = null;

  function LoadData() {
    var defer = $q.defer();
    $http.get('stadtmobilRates.json').success(function(data) {
      mobilRates = data;
      defer.resolve();
    });
    return defer.promise;
  }

  return {
    GetData: function() {
      return mobilRates;
    },
    LoadData: LoadData
  };
});

myApp.controller('smController', [
  '$scope',
  'stadtMobilRates',
  function($scope, stadtMobilRates) {
    var stadtmobilRates = stadtMobilRates.GetData();

    $scope.distance = 10;
    $scope.timeHours = 10;
    $scope.timeDays = 0;
    $scope.timeWeeks = 0;
    $scope.rate = 'A';
    $scope.tariff = 'classic';

    var getDuration = function(hours, days, weeks) {
      return moment.duration({
        hours: hours,
        days: days,
        weeks: weeks
      });
    };

    var getFeeTime = function(duration, rate) {
      return (
        duration.hours() * rate.hour +
        duration.days() % 7 * rate.day +
        Math.floor(duration.days() / 7) * rate.week
      );
    };

    var getFeeDistance = function(km, rate) {
      var fee = 0;
      if (km >= 701) {
        fee = 100 * rate.km000 + 600 * rate.km101 + (km - 700) * rate.km701;
      } else if (km < 701 && km >= 101) {
        fee = 100 * rate.km000 + (km - 100) * rate.km101;
      } else {
        fee = km * rate.km000;
      }
      return fee;
    };

    var getCurrentRate = function(rate, tariff) {
      // studi and classic have the same rates
      if (tariff === 'studi') {
        tariff = 'classic';
      }
      return stadtmobilRates[tariff][rate];
    };

    var priceDistance = function(km, rate, tariff) {
      var currentRate = getCurrentRate(rate, tariff);
      return getFeeDistance(km, currentRate);
    };

    var priceTime = function(timeHours, timeDays, timeWeeks, rate, tariff) {
      var currentRate = getCurrentRate(rate, tariff);
      var duration = getDuration(timeHours, timeDays, timeWeeks);
      return getFeeTime(duration, currentRate);
    };

    var price = function(
      distance,
      timeHours,
      timeDays,
      timeWeeks,
      rate,
      tariff) {
      return (
        priceDistance(distance, rate, tariff) +
        priceTime(timeHours, timeDays, timeWeeks, rate, tariff)
      );
    };

    $scope.price = price;
    $scope.priceDistance = priceDistance;
    $scope.priceTime = priceTime;

  }
]);

myApp.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider, $scope) {
    $locationProvider.html5Mode(true);

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
      controller: 'smController',
      resolve: {
        load: function(stadtMobilRates) {
          return stadtMobilRates.LoadData();
        }
      }
    }).
    when('/test', {
      templateUrl: 'partials/test.html',
      controller: 'smController',
      resolve: {
        load: function(stadtMobilRates) {
          return stadtMobilRates.LoadData();
        }
      }
    }).
    otherwise({
      redirectTo: '/c2g'
    });
  }
]);

myApp.directive('navBar', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/navBar.html',
    controller: function($scope, $element, $location) {
      $scope.isActive = function(viewLocation) {

        var active = false;

        if (viewLocation === $location.path()) {
          active = true;
        }

        return active;

      };
    }
  };
});

myApp.controller('DatepickerDemoCtrl', function($scope) {
  $scope.maxDate = new moment().add(100, 'y');

  // start date
  $scope.startDateToday = function() {
    $scope.startDate = new moment();
  };
  $scope.startDateToday();

  $scope.startDateClear = function() {
    $scope.startDate = null;
  };

  $scope.startDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.startDateOpened = true;
  };

  // end date
  $scope.endDateToday = function() {
    $scope.endDate = new moment();
  };
  $scope.endDate = new moment().add(20, 'h');

  $scope.endDateClear = function() {
    $scope.endDate = null;
  };

  $scope.endDateOpen = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.endDateOpened = true;
  };

  // generic functions
  $scope.toggleMin = function() {
    $scope.minDate = new moment();
  };
  $scope.toggleMin();

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[2];

  // duration
  $scope.getDuration = function(start, end) {
    return moment.duration(end - start).humanize();
  };

});
