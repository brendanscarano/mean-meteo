import angular from 'angular';
import moment from 'moment';

(function() {

  function convertHourlyTime() {

    return ( input ) => {

      return moment.unix(input).format('h:mm a');

    };

  }

  function convertDailyTime() {

    return ( input ) => {

      return moment.unix(input).format('dddd');

    };

  }

  function convertIconEmoji() {

    return ( input ) => {

      const weatherIcons = {
        'clear-day': 'twa twa-sunny',
        'clear-night': 'twa twa-moon',
        'cloudy': 'twa twa-cloud',
        'partly-cloudy-day': 'twa twa-cloud',
        'partly-cloudy-night': 'twa twa-cloud',
        'rain': 'twa twa-umbrella',
        'snow': 'twa twa-snowflake'
      };

      return weatherIcons[input];

    };

  }

  angular
    .module('WeatherForecastFilters', [])
    .filter('convertHourlyTime', convertHourlyTime)
    .filter('convertDailyTime', convertDailyTime)
    .filter('convertIconEmoji', convertIconEmoji);

})();