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
        .when('/login', {
            templateUrl: 'app/components/loginWithoutFB/login.html',
            controller: 'LoginController',
            controllerAs: 'loginCtrl'
        })
        .when('/category', {
            templateUrl: 'app/categories/categories.html',
            controller: 'CategoryController',
            controllerAs: 'catCtrl'
        })
        .when('/category/:item?', {
            templateUrl: 'app/components/showResults/showResults.html',
            controller: 'ShowResultsController',
            controllerAs: 'resCtrl'
        })
        .when('/category/:item?/:element?', {
            templateUrl: 'app/elementInfo/elementInfo.html',
            controller: 'ElementInfoController',
            controllerAs: 'elemCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
  }

})();
