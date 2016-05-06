(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$localStorage', '$sessionStorage'];

    function FavoritePlacesController($scope, FacebookService, userService, googleMapPositionService, cacheService, $localStorage, $sessionStorage) {
        var favoriteVm = this;
        
        favoriteVm.$storage = $localStorage;
        favoriteVm.favoriteList = favoriteVm.$storage.items;
        favoriteVm.user = userService.user;
        favoriteVm.removeFavorite = removeFavorite;
        favoriteVm.ready = false;
        favoriteVm.googleMapApiReady;
        favoriteVm.state;
        favoriteVm.onDropComplete = onDropComplete;

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    favoriteVm.ready = true;
                    initGoogleMapApi();
                });
        }

        function initGoogleMapApi() {
            googleMapPositionService.onReady()
            .then(function(){
                favoriteVm.googleMapApiReady = true;
            });
        }

        $scope.$watch(function(){
            return favoriteVm.user.connected;
        }, function(state){
            favoriteVm.state = state;
        });


        function removeFavorite(item) {
            favoriteVm.$storage.items.forEach(function(element,index,array){
                if (item.id === element.id) {
                    favoriteVm.indexToDelete = index;
                }
            });
            favoriteVm.$storage.items.splice(favoriteVm.indexToDelete, 1);
        }


	    function onDropComplete(index, obj, evt){
	    	console.log(index, obj, evt);
	        var otherObj = favoriteVm.favoriteList[index];
            var otherIndex = favoriteVm.favoriteList.indexOf(obj);
           	favoriteVm.favoriteList[index] = obj;
            favoriteVm.favoriteList[otherIndex] = otherObj;
	    }

    }

})();
