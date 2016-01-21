import moment from 'moment';

(function() {
  'use strict';

  function dateTime( $timeout ) {

    console.log('testing')
    function dateTimeCtrl() {

      this.todaysDate = moment().format('dddd MMMM DD YYYY');

      let updateTime = () => {

        let now = moment().format('hh:mm:ss A');

        this.currentTime = now;
        $timeout(updateTime, 1000);

      };
      
      updateTime();

    }

    return {
      restrict: 'EA',
      controller: dateTimeCtrl,
      controllerAs: 'vm',
      scope: {},
      templateUrl: 'components/date-time/date-time.html'
    };

  }

  angular
    .module('DateTimeDirective', [])
    .directive('dateTime', ['$timeout', dateTime]);

})();