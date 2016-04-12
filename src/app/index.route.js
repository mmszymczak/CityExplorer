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
        .when('/category', {
            templateUrl: 'app/components/showResults/main.html',
            controller: 'ResultsController',
            controllerAs: 'result'
        })
        .when('/login', {
            templateUrl: 'app/components/loginWithoutFB/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }

})();
