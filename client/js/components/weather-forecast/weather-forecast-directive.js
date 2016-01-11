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