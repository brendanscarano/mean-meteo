angular.module('ngApp', [
  'DateTimeDirective'
]);
(function() {
  'use strict';

  function dateTime( $timeout, $http ) {

    function dateTimeCtrl() {


      navigator.geolocation.getCurrentPosition(function(response) {

        console.log(response);
        $http.get('/weather/' + response.coords.latitude + '/' + response.coords.longitude).then(function(res) {

          console.log(JSON.parse(res.data.body));

        })

      });

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
//# sourceMappingURL=app.js.map
