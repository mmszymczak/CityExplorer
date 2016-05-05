(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$localStorage', '$sessionStorage'];

    function FavoritePlacesController($scope, FacebookService, userService, googleMapPositionService, cacheService, $localStorage, $sessionStorage) {
        var favoriteVm = this;
        
        favoriteVm.$storage = $localStorage;
        console.log(favoriteVm.$storage.items);
        favoriteVm.favoriteList = favoriteVm.$storage.items;
        favoriteVm.removeFavorite = removeFavorite;

        function removeFavorite(item) {
            favoriteVm.$storage.items.forEach(function(element,index,array){
                if (item.id === element.id) {
                    favoriteVm.indexToDelete = index;
                }
            });
            if (favoriteVm.indexToDelete) {
                favoriteVm.$storage.items.splice(favoriteVm.indexToDelete, 1); 
            }
            console.log(10);
        }



    }

})();
