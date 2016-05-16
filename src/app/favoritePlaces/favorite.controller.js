(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$rootScope', 'cacheService', 'FacebookService', 'userService', 'googleMapPositionService', 'firebaseService'];

    function FavoritePlacesController($rootScope, cacheService, FacebookService, userService, googleMapPositionService, firebaseService) {
        var favoriteVm = this;

        favoriteVm.favoriteList = [];
        favoriteVm.user = userService.user;

        favoriteVm.removeFavorite = removeFavorite;
        favoriteVm.getFavoritePlaces = getFavoritePlaces;

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    getFavoritePlaces();
                });
        }

        function getFavoritePlaces() {
            if(cacheService.favorite.length === 0){
                firebaseService.getFavoritePlaces(userService.user)
                    .then(function(result){
                        favoriteVm.favoriteList = result;
                        cacheService.saveFavorite(result);
                    });
            } else {
                favoriteVm.favoriteList = cacheService.getFavorite();
            }
        }

        function removeFavorite(item) {
            firebaseService.removeFavoritePlace(userService.user, item);
        }

    }

})();
