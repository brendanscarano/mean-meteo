(function() {
  'use strict';

  function dateTime( $timeout, $http ) {

    function weatherForecastCtrl() {

      var vm = this;

      vm.Math = window.Math;

      navigator.geolocation.getCurrentPosition(function(response) {

        $http.get('/weather/' + response.coords.latitude + '/' + response.coords.longitude).then(function(res) {

          console.log(JSON.parse(res.data.body));

          var data = JSON.parse(res.data.body);

          vm.hourlyForecast = data.hourly;

          vm.dailyForecast = data.daily;

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
    .module('WeatherForecastDirective', ['WeatherForecastFilters'])
    .directive('weatherForecast', ['$timeout', '$http', dateTime]);

})();