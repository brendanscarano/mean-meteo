(function() {
  'use strict';

  function dateTime( $timeout, $http ) {

    function weatherForecastCtrl() {

      var vm = this;

      console.log('testing');

      navigator.geolocation.getCurrentPosition(function(response) {

        $http.get('/weather/' + response.coords.latitude + '/' + response.coords.longitude).then(function(res) {

          console.log(JSON.parse(res.data.body));
          var data = JSON.parse(res.data.body);
          vm.hourlyForecast = data.hourly;

        })

      });

    }

    return {
      restrict: 'EA',
      controller: weatherForecastCtrl,
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'components/weather-forecast/weather-forecast.html'
      // template: [
      //   '<h1>Weather Forecast Directive</h1>'
      // ].join('')
    };

  }

  angular
    .module('WeatherForecastDirective', [])
    .directive('weatherForecast', ['$timeout', '$http', dateTime]);

})();