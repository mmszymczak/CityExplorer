(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$cookieStore'];

    function FavoritePlacesController($scope, FacebookService, userService, googleMapPositionService, cacheService, $cookieStore) {
        var favoriteVm = this;

        console.log(cacheService.getFavorite());
        // favoriteVm.favoriteList = cacheService.getFavorite();
        console.log(favoriteCookie);





    }

})();
