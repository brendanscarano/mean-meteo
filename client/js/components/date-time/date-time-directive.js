(function() {
  'use strict';

  function dateTime( $timeout ) {

    function dateTimeCtrl() {

      let vm = this;

      vm.todaysDate = moment().format('dddd MMMM DD YYYY');

      let updateTime = function(){

        let now = moment().format('hh:mm:ss A');

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
      templateUrl: 'components/date-time/date-time.html'
    };

  }

  angular
    .module('DateTimeDirective', [])
    .directive('dateTime', ['$timeout', dateTime]);

})();