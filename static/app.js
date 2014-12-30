var myApp = angular.module('myApp', ['ngRoute', 'angularMoment']);

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

myApp.controller('smController', ['$scope', function($scope) {
  $scope.distance = 10;
  $scope.timeHours = 20;
  $scope.timeDays = 0;
  $scope.timeWeeks = 0;
  $scope.rate = 'A';
  $scope.tariff = 'classic';

  var stadtmobilRates = {
    classic: {
      A: {
        night: 0,
        hour: 1.4,
        day: 21,
        week: 125,
        km000: 0.2,
        km101: 0.18,
        km701: 0.18
      },
      B: {
        night: 0,
        hour: 2.2,
        day: 25,
        week: 140,
        km000: 0.22,
        km101: 0.19,
        km701: 0.16
      },
      C: {
        night: 0,
        hour: 2.8,
        day: 32,
        week: 160,
        km000: 0.26,
        km101: 0.21,
        km701: 0.17
      },
      D: {
        night: 1,
        hour: 3.2,
        day: 35,
        week: 190,
        km000: 0.29,
        km101: 0.25,
        km701: 0.25
      },
      F: {
        night: 2,
        hour: 4.2,
        day: 44,
        week: 245,
        km000: 0.33,
        km101: 0.27,
        km701: 0.27
      }
    },
    basic: {
      A: {
        night: 0,
        hour: 1.6,
        day: 26,
        week: 140,
        km000: 0.22,
        km101: 0.18,
        km701: 0.18
      },
      B: {
        night: 0,
        hour: 2.7,
        day: 30,
        week: 155,
        km000: 0.27,
        km101: 0.21,
        km701: 0.16
      },
      C: {
        night: 0,
        hour: 3.3,
        day: 37,
        week: 175,
        km000: 0.31,
        km101: 0.23,
        km701: 0.17
      },
      D: {
        night: 1,
        hour: 3.7,
        day: 40,
        week: 210,
        km000: 0.34,
        km101: 0.25,
        km701: 0.25
      },
      F: {
        night: 2,
        hour: 4.7,
        day: 49,
        week: 260,
        km000: 0.38,
        km101: 0.27,
        km701: 0.27
      }
    },
    business: {
      A: {},
      B: {},
      C: {},
      D: {},
      F: {}
    }
  };

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

  var price = function(distance, timeHours, timeDays, timeWeeks, rate, tariff) {
    return (
      priceDistance(distance, rate, tariff) +
      priceTime(timeHours, timeDays, timeWeeks, rate, tariff)
    );
  };

  $scope.price = price;
  $scope.priceDistance = priceDistance;
  $scope.priceTime = priceTime;

}]);

myApp.controller('TabController', function($scope) {
  $scope.tab = 1;

  $scope.isSet = function(checkTab) {
    return $scope.tab === checkTab;
  };

  $scope.setTab = function(setTab) {
    $scope.tab = setTab;
  };
});

myApp.controller('RateController', function($scope) {});

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
  }
]);
