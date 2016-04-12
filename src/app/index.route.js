(function() {
  'use strict';

  angular
    .module('project')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/some', {
        templateUrl: 'app/components/showResults/main.html',
        controller: 'ResultsController',
        controllerAs: 'result'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
