(function() {
  'use strict';

  function dateTime( $timeout ) {

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
      templateUrl: 'components/date-time/date-time.html'
    };

  }

  angular
    .module('DateTimeDirective', [])
    .directive('dateTime', ['$timeout', dateTime]);

})();