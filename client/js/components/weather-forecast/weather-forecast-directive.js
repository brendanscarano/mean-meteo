import angular from 'angular';

(function() {
  'use strict';

  function dateTime( $http ) {

    function weatherForecastCtrl() {

      this.Math = window.Math;

      navigator.geolocation.getCurrentPosition( (response) => {

        let addressAPICall = `/address/${response.coords.latitude}/${response.coords.longitude}`;

        let weatherAPICall = `/weather/${response.coords.latitude}/${response.coords.longitude}`;

        $http.get(addressAPICall).then( (res) => {

          const addressData = JSON.parse(res.data.body);

          this.address = addressData.results[0].formatted_address;

        })

        $http.get(weatherAPICall).then( (res) => {

          const data = JSON.parse(res.data.body);

          this.hourlyForecast = data.hourly;

          this.dailyForecast = data.daily;

        })

      });

    }

    return {
      restrict: 'EA',
      controller: weatherForecastCtrl,
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'components/weather-forecast/weather-forecast.html'
    };

  }

  angular
    .module('WeatherForecastDirective', ['WeatherForecastFilters'])
    .directive('weatherForecast', ['$http', dateTime]);

})();