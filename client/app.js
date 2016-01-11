angular.module('ngApp', [
  'DateTimeDirective',
  'WeatherForecastDirective'
]);
(function() {
  'use strict';

  function dateTime( $timeout, $http ) {

    function dateTimeCtrl() {

      var vm = this;

      vm.todaysDate = moment().format('dddd MMMM DD YYYY');

      var updateTime = function(){

        var now = moment().format('hh:mm:ss A');

        vm.currentTime = now;
        $timeout(updateTime, 1000);

      };
      
      updateTime();

    }

    return {
      restrict: 'EA',
      controller: dateTimeCtrl,
      controllerAs: 'vm',
      scope: {},
      // templateUrl: 'client/js/components/date-time/date-time.html'
      template: [
        '<div class="date-time-wrapper">',
          '<span class="date-time-wrapper__time">{{vm.currentTime}}</span><br />',
          '<span class="date-time-wrapper__date">{{vm.todaysDate}}</span>',
        '</div>'
      ].join('')
    };

  }

  angular
    .module('DateTimeDirective', [])
    .directive('dateTime', ['$timeout', '$http', dateTime]);

})();
(function() {
  'use strict';

  function dateTime( $timeout, $http ) {

    function weatherForecastCtrl() {

      navigator.geolocation.getCurrentPosition(function(response) {

        $http.get('/weather/' + response.coords.latitude + '/' + response.coords.longitude).then(function(res) {

          console.log(JSON.parse(res.data.body));

        })

      });

    }

    return {
      restrict: 'EA',
      controller: weatherForecastCtrl,
      controllerAs: 'vm',
      scope: {},
      // templateUrl: 'client/js/components/date-time/date-time.html'
      template: [
        '<h1>Weather Forecast Directive</h1>'
      ].join('')
    };

  }

  angular
    .module('WeatherForecastDirective', [])
    .directive('weatherForecast', ['$timeout', '$http', dateTime]);

})();
//# sourceMappingURL=app.js.map
