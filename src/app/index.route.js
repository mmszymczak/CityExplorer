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
            templateUrl: 'app/categories/categories.html',
            controller: 'CategoryController',
            controllerAs: 'catCtrl'
        })
        .when('/category/:item?', {
            templateUrl: 'app/components/showResults/showResults.html',
            controller: 'ResultsController',
            controllerAs: 'resCtrl'
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
