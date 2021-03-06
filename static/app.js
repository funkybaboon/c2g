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

  $scope.showMsgRoundDownToDays = false;
  $scope.showMsgRoundDownToHours = false;

  $scope.msgRoundDownToHours = ' (abgerundet auf Stundengebühr)';
  $scope.msgRoundDownToDays = ' (abgerundet auf Tagesgebühr)';

  $scope.resolution = ['minutes', 'minutesStanding', 'airport'];
  $scope.resolutionTime = ['minutes', 'hours', 'days'];

  $scope.getMinutes = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return duration.minutes();
  };

  $scope.getHours = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return duration.hours();
  };

  $scope.getDays = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return Math.floor(duration.asDays());
  };

  $scope.getFreeKm = function(minutes) {
    var feeMinutes = $scope.getFeeMinutes(minutes);
    var feeHours = $scope.getFeeHours(minutes);
    var feeDays = $scope.getFeeDays(minutes);

    var freeKm = 50;

    if ($scope.getDays(minutes) > 0) {
      freeKm = $scope.getDays(minutes) * 100;
    }

    if (feeMinutes + feeHours >= $scope.feeDay) {
      if (freeKm == 50) {
        freeKm = 100;
      } else {
        freeKm += 100;
      }
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

  $scope.getFeeMinutes = function(minutes) {
    var fee = $scope.getMinutes(minutes) * $scope.feeMinute;
    if (fee >= $scope.feeHour) {
      fee = $scope.feeHour;
    }

    return fee;
  };

  $scope.getFeeHours = function(minutes) {
    var fee = $scope.getHours(minutes) * $scope.feeHour;
    if (fee >= $scope.feeDay) {
      fee = $scope.feeDay;
    }

    return fee;
  };

  $scope.getFeeDays = function(minutes) {
    var feeMinutes = $scope.getFeeMinutes(minutes);
    var feeHours = $scope.getFeeHours(minutes);
    var feeDays = $scope.getDays(minutes) * $scope.feeDay;

    if (feeMinutes + feeHours >= $scope.feeDay) {
      feeDays += $scope.feeDay;
    }

    return feeDays;
  };

  $scope.getFeeStanding = function(minutes) {
    return minutes * 0.19;
  };

  $scope.getFeeAirport = function(airport) {
    var fee = 0;
    if (airport) {
      fee = 4.90;
    }
    return fee;
  };

  $scope.price = function(km, minutes, timeStanding, airport) {
    $scope.msgRoundDownToHours = ' (abgerundet auf Stundengebühr)';
    var feeMinutes = $scope.getFeeMinutes(minutes);
    var feeHours = $scope.getFeeHours(minutes);
    var feeDays = $scope.getFeeDays(minutes);

    if (feeMinutes >= $scope.feeHour) {
      $scope.showMsgRoundDownToHours = true;
    } else {
      $scope.showMsgRoundDownToHours = false;
    }
    if (feeHours >= $scope.feeDay) {
      $scope.showMsgRoundDownToDays = true;
    } else {
      $scope.showMsgRoundDownToDays = false;
    }

    if (feeMinutes + feeHours >= $scope.feeDay) {
      $scope.msgRoundDownToHours = $scope.msgRoundDownToDays;
      $scope.showMsgRoundDownToDays = true;
      $scope.showMsgRoundDownToHours = true;
      feeMinutes = 0;
      feeHours = 0;
    }

    return (
      $scope.getfeeAdditionalKm(km, minutes) +
      feeDays +
      feeHours +
      feeMinutes +
      $scope.getFeeStanding(timeStanding) +
      $scope.getFeeAirport(airport)
    );
  };

  var getDurationBilled = function(minutes) {
    var feeMinutes = $scope.getMinutes(minutes) * $scope.feeMinute;
    var feeHours = $scope.getHours(minutes) * $scope.feeHour;
    var feeDays = $scope.getDays(minutes) * $scope.feeDay;

    var minutesBilled = $scope.getMinutes(minutes);
    var hoursBilled = $scope.getHours(minutes);
    var daysBilled = $scope.getDays(minutes);

    if (feeMinutes >= $scope.feeHour) {
      minutesBilled = 0;
      feeMinutes = 0;
      hoursBilled += 1;
      feeHours = hoursBilled * $scope.feeHour;
    }

    if (feeMinutes + feeHours >= $scope.feeDay) {
      minutesBilled = 0;
      feeMinutes = 0;
      hoursBilled = 0;
      feeHours = 0;
      daysBilled += 1;
      feeDays = daysBilled * $scope.feeDay;
    }

    var duration = moment.duration({
      minutes: minutesBilled,
      hours: hoursBilled,
      days: daysBilled,
    });

    return duration;

  };

  $scope.getMinutesBilled = function(minutes) {
    return getDurationBilled(minutes).minutes();
  };

  $scope.getHoursBilled = function(minutes) {
    return getDurationBilled(minutes).hours();
  };

  $scope.getDaysBilled = function(minutes) {
    return getDurationBilled(minutes).days();
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

  $scope.showMsgRoundDownToDays = false;

  $scope.msgRoundDownToDays = ' (abgerundet auf Tagesgebühr)';

  $scope.resolution = ['minutes', 'airport'];
  $scope.resolutionTime = ['hours', 'days'];

  $scope.getHours = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return Math.ceil(duration.asHours() % 24);
  };

  $scope.getDays = function(minutes) {
    var duration = moment.duration(minutes, 'm');
    return Math.floor(duration.asDays());
  };

  $scope.getFreeKm = function(minutes) {
    var feeHours = $scope.getFeeHours(minutes);
    var feeDays = $scope.getFeeDays(minutes);

    var freeKm = 50;

    if ($scope.getDays(minutes) > 0) {
      freeKm = $scope.getDays(minutes) * 200;
    }

    if (feeHours >= $scope.feeDay) {
      if (freeKm == 50) {
        freeKm = 200;
      } else {
        freeKm += 200;
      }
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
    var fee = $scope.getHours(minutes) * $scope.feeHour;
    if (fee >= $scope.feeDay) {
      fee = $scope.feeDay;
    }

    return fee;
  };

  $scope.getFeeAirport = function(airport) {
    var fee = 0;
    if (airport) {
      fee = 4.90;
    }
    return fee;
  };

  $scope.price = function(km, minutes, airport) {
    var feeHours = $scope.getFeeHours(minutes);
    var feeDays = $scope.getFeeDays(minutes);

    if (feeHours >= $scope.feeDay) {
      $scope.showMsgRoundDownToDays = true;
    } else {
      $scope.showMsgRoundDownToDays = false;
    }

    return (
      $scope.getfeeAdditionalKm(km, minutes) +
      feeDays +
      feeHours +
      $scope.getFeeAirport(airport)
    );
  };

  var getDurationBilled = function(minutes) {
    var feeHours = $scope.getHours(minutes) * $scope.feeHour;
    var feeDays = $scope.getDays(minutes) * $scope.feeDay;

    var hoursBilled = $scope.getHours(minutes);
    var daysBilled = $scope.getDays(minutes);

    if (feeHours >= $scope.feeDay) {
      hoursBilled = 0;
      feeHours = 0;
      daysBilled += 1;
      feeDays = daysBilled * $scope.feeDay;
    }

    var duration = moment.duration({
      hours: hoursBilled,
      days: daysBilled,
    });

    return duration;

  };

  $scope.getHoursBilled = function(minutes) {
    return getDurationBilled(minutes).hours();
  };

  $scope.getDaysBilled = function(minutes) {
    return getDurationBilled(minutes).days();
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

    $scope.resolution = ['hours', 'days', 'weeks'];
    $scope.resolutionTime = ['hours', 'days', 'weeks'];

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

    //-------------------------------------------------------------------------
    // Billing Box Hack
    //-------------------------------------------------------------------------
    var getDurationAll = function() {
      return getDuration(
        $scope.timeHours,
        $scope.timeDays,
        $scope.timeWeeks
      );
    };

    var getCurrentRateAll = function() {
      var rate = $scope.rate;
      var tariff = $scope.tariff;
      // studi and classic have the same rates
      if (tariff === 'studi') {
        tariff = 'classic';
      }
      return stadtmobilRates[tariff][rate];
    };

    $scope.getHours = function() {
      return getDurationAll().hours();
    };

    $scope.getDays = function() {
      return Math.floor(getDurationAll().asDays() % 7);
    };

    $scope.getWeeks = function() {
      return Math.floor(getDurationAll().asDays() / 7);
    };

    var getDurationBilled = function() {
      var rate = getCurrentRateAll();

      var feeHours = $scope.getHours() * rate.hour;
      var feeDays = $scope.getDays() * rate.day;
      var feeMWeeks = $scope.getWeeks() * rate.week;

      var hoursBilled = $scope.getHours();
      var daysBilled = $scope.getDays();
      var weeksBilled = $scope.getWeeks();

      if (feeHours >= rate.day) {
        hoursBilled = 0;
        feeHours = 0;
        daysBilled += 1;
        feeDays = daysBilled * rate.day;
      }

      if (feeHours + feeDays >= rate.week) {
        hoursBilled = 0;
        feeHours = 0;
        daysBilled = 0;
        feeDays = 0;
        weeksBilled += 1;
        feeWeeks = weeksBilled * rate.week;
      }

      var duration = moment.duration({
        hours: hoursBilled,
        days: daysBilled,
        weeks: weeksBilled
      });

      return duration;
    };

    $scope.getHoursBilled = function() {
      return getDurationBilled().hours();
    };

    $scope.getDaysBilled = function() {
      return Math.floor(getDurationBilled().asDays() % 7);
    };

    $scope.getWeeksBilled = function() {
      return Math.floor(getDurationBilled().asDays() / 7);
    };
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
      $scope.tabs = [{
        name: 'Car2go',
        url: 'c2g'
      }, {
        name: 'Car2goBlack',
        url: 'c2gb'
      }, {
        name: 'Stadtmobil',
        url: 'sm'
      }, {
        name: 'Datetime',
        url: 'dtp'
      }];

      $scope.isActive = function(viewLocation) {
        return viewLocation === $location.path();
      };
    }
  };
});

myApp.directive('timeInputForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/timeInputForm.html',
    controller: function($scope) {
      $scope.isResolution = function(value) {
        return $scope.resolution.indexOf(value) !== -1;
      };
    }
  };
});

myApp.directive('dtpForm', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/dtpForm.html'
  };
});

myApp.directive('billedBox', function() {
  return {
    restrict: 'E',
    templateUrl: 'partials/billedBox.html',
    controller: function($scope) {
      $scope.isResolution = function(value) {
        return $scope.resolutionTime.indexOf(value) !== -1;
      };
    }
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

    $scope.resolutionTime = ['hours', 'days', 'weeks'];

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

    //-------------------------------------------------------------------------
    // Billing Box Hack
    //-------------------------------------------------------------------------
    var getDurationAll = function() {
      return moment.duration($scope.endDate - $scope.startDate);
    };

    var getCurrentRateAll = function() {
      var rate = $scope.rate;
      var tariff = $scope.tariff;
      // studi and classic have the same rates
      if (tariff === 'studi') {
        tariff = 'classic';
      }
      return stadtmobilRates[tariff][rate];
    };

    $scope.getHours = function() {
      return getDurationAll().hours();
    };

    $scope.getDays = function() {
      return Math.floor(getDurationAll().asDays() % 7);
    };

    $scope.getWeeks = function() {
      return Math.floor(getDurationAll().asDays() / 7);
    };

    var getDurationBilled = function() {
      var rate = getCurrentRateAll();

      var feeHours = $scope.getHours() * rate.hour;
      var feeDays = $scope.getDays() * rate.day;
      var feeMWeeks = $scope.getWeeks() * rate.week;

      var hoursBilled = $scope.getHours();
      var daysBilled = $scope.getDays();
      var weeksBilled = $scope.getWeeks();

      if (feeHours >= rate.day) {
        hoursBilled = 0;
        feeHours = 0;
        daysBilled += 1;
        feeDays = daysBilled * rate.day;
      }

      if (feeHours + feeDays >= rate.week) {
        hoursBilled = 0;
        feeHours = 0;
        daysBilled = 0;
        feeDays = 0;
        weeksBilled += 1;
        feeWeeks = weeksBilled * rate.week;
      }

      var duration = moment.duration({
        hours: hoursBilled,
        days: daysBilled,
        weeks: weeksBilled
      });

      return duration;
    };

    $scope.getHoursBilled = function() {
      return getDurationBilled().hours();
    };

    $scope.getDaysBilled = function() {
      return Math.floor(getDurationBilled().asDays() % 7);
    };

    $scope.getWeeksBilled = function() {
      return Math.floor(getDurationBilled().asDays() / 7);
    };
  }
]);