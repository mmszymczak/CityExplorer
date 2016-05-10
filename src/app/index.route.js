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
            controllerAs: 'mainVm'
        })
        .when('/category', {
            templateUrl: 'app/category/category.html',
            controller: 'CategoryController',
            controllerAs: 'categoryVm'
        })
        .when('/category/:item?', {
            templateUrl: 'app/showResults/showResults.html',
            controller: 'ShowResultsController',
            controllerAs: 'resultVm'
        })
        .when('/category/:item?/:element?', {
            templateUrl: 'app/elementInfo/elementInfo.html',
            controller: 'ElementInfoController',
            controllerAs: 'infoVm'
        })
        .when('/favorite', {
            templateUrl: 'app/favoritePlaces/favorite.html',
            controller: 'FavoritePlacesController',
            controllerAs: 'favoriteVm'
        })
        .otherwise({
            redirectTo: '/'
        });
  }

})();
