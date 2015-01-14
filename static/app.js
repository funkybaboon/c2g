var myApp = angular.module('myApp', [
  'ngRoute',
  'angularMoment',
  'ui.bootstrap',
  'ui.bootstrap.datetimepicker'
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
    var duration = moment.duration(minutes, 'm');
    return Math.floor(duration.asDays());
  };

  $scope.getHours = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return duration.hours();
  };

  $scope.getMinutes = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return duration.minutes();
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
    return $scope.getDays(minutes) * $scope.feeDay;
  };

  $scope.getFeeHours = function(minutes) {
    return $scope.getHours(minutes) * $scope.feeHour;
  };

  $scope.getFeeMinutes = function(minutes) {
    return $scope.getMinutes(minutes) * $scope.feeMinute;
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
    var duration = moment.duration(minutes, 'm');
    return Math.floor(duration.asDays());
  };

  $scope.getHours = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return Math.ceil(duration.asHours() % 24);
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
    return $scope.getDays(minutes) * $scope.feeDay;
  };

  $scope.getFeeHours = function(minutes) {
    return $scope.getHours(minutes) * $scope.feeHour;
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

myApp.factory('stadtMobilRates', function($http) {
  var promise = null;

  return function() {
    if (promise) {
      // If we've already asked for this data once,
      // return the promise that already exists.
      return promise;
    } else {
      promise = $http.get('stadtmobilRates.json');
      return promise;
    }
  };
});

myApp.controller('smController', [
  '$scope',
  'stadtmobilRates',
  function($scope, stadtmobilRates) {
    $scope.distance = 10;
    $scope.timeHours = 10;
    $scope.timeDays = 0;
    $scope.timeWeeks = 0;
    $scope.rate = 'A';
    $scope.tariff = 'classic';

    var getDuration = function(hours, days, weeks) {
      var durationHours = moment.duration(hours, 'h');
      var durationDays = moment.duration(days, 'd');
      var durationWeeks = moment.duration(weeks, 'w');

      var durationAll = durationHours.add(durationDays).add(durationWeeks);
      return durationAll;
    };

    var getFeeTime = function(duration, rate) {
      var feeHours = duration.hours() * rate.hour;
      var feeDays = Math.floor(duration.asDays() % 7) * rate.day;
      var feeWeeks = Math.floor(duration.asDays() / 7) * rate.week;

      var fee = feeHours + feeDays + feeWeeks;
      return fee;
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
        stadtmobilRates: ['stadtMobilRates', function(stadtMobilRates) {
          return stadtMobilRates().then(function(resp) {
            return resp.data;
          });
        }]
      }
    }).
    when('/test', {
      templateUrl: 'partials/test.html',
      controller: 'DatepickerDemoCtrl'
    }).
    when('/dtp', {
      templateUrl: 'partials/dtp.html',
      controller: 'datetimepickerCtrl',
      resolve: {
        stadtmobilRates: ['stadtMobilRates', function(stadtMobilRates) {
          return stadtMobilRates().then(function(resp) {
            return resp.data;
          });
        }]
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

myApp.controller('datetimepickerCtrl', [
  '$scope',
  'stadtmobilRates',
  function($scope, stadtmobilRates) {
    moment.locale('de');
    $scope.startDate = new moment();
    $scope.endDate = new moment().add(10, 'h');
    $scope.distance = 10;

    $scope.rate = 'A';
    $scope.tariff = 'classic';

    var getDurationExact = function(start, end) {
      timespan = moment.duration(end - start);
      timespanExact = {
        hours: timespan.hours(),
        days: Math.floor(timespan.asDays() % 7),
        weeks: Math.floor(timespan.asDays() / 7)
      };
      return timespanExact;
    };

    var getFeeTime = function(timespan, rate) {
      return (
        timespan.hours * rate.hour +
        timespan.days * rate.day +
        timespan.weeks * rate.week
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

    var priceTime = function(startDate, endDate, rate, tariff) {
      var currentRate = getCurrentRate(rate, tariff);
      var duration = getDurationExact(startDate, endDate);
      return getFeeTime(duration, currentRate);
    };

    var price = function(
      distance,
      startDate,
      endDate,
      rate,
      tariff) {
      return (
        priceDistance(distance, rate, tariff) +
        priceTime(startDate, endDate, rate, tariff)
      );
    };

    $scope.price = price;
    $scope.priceDistance = priceDistance;
    $scope.priceTime = priceTime;
    $scope.getDurationExact = getDurationExact;

    // duration
    $scope.getDuration = function(start, end) {
      return Math.ceil(moment.duration(end - start).asHours());
    };

    $scope.getDurationHumanized = function(start, end) {
      return moment.duration(end - start).humanize();
    };
  }
]);
