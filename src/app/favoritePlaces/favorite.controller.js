(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$localStorage', '$sessionStorage', 'errorHandling', '$routeParams'];

    function FavoritePlacesController($scope, FacebookService, userService, googleMapPositionService, cacheService, $localStorage, $sessionStorage, errorHandling, $routeParams) {
        var favoriteVm = this;

        favoriteVm.$storage = $localStorage;
        favoriteVm.favoriteList = favoriteVm.$storage.items;
        favoriteVm.user = userService.user;
        favoriteVm.removeFavorite = removeFavorite;
        favoriteVm.ready = false;
        favoriteVm.googleMapApiReady;
        favoriteVm.state;
        favoriteVm.onDropComplete = onDropComplete;
        favoriteVm.listOfObjectPlaces = [];
        favoriteVm.position = {};
        favoriteVm.activate = activate;
        favoriteVm.addToMap = addToMap;
        favoriteVm.listClickedFav = [];
        favoriteVm.$storage.clicked = favoriteVm.$storage.clicked || [];
        favoriteVm.clickedToMap = favoriteVm.$storage.clicked;
        favoriteVm.checkIfClicked = checkIfClicked;
        favoriteVm.limitToCheck = 4;
        favoriteVm.checkDisable = checkDisable;

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
	        var otherObj = favoriteVm.favoriteList[index];
            var otherIndex = favoriteVm.favoriteList.indexOf(obj);
            console.log(otherObj, otherIndex);
            console.log(obj, index);
           	favoriteVm.favoriteList[index] = obj;
            favoriteVm.favoriteList[otherIndex] = otherObj;
            //             console.log(favoriteVm.$storage.clicked);
            // console.log(favoriteVm.$storage.items);
	    }

        function addToMap(id) {
            if (favoriteVm.$storage.clicked.includes(id)) {
                favoriteVm.$storage.clicked = favoriteVm.$storage.clicked.filter(function(element,index,array) {
                    return (element !== id);
                });
            } else {
                favoriteVm.$storage.clicked.push(id);
            }
        }

        function checkIfClicked(id){
            if (favoriteVm.$storage.clicked.includes(id)) {
                return true;
            } else {
                return false;
            }
        }

        function checkDisable(id){
            if (favoriteVm.limitToCheck === favoriteVm.$storage.clicked.length && !favoriteVm.$storage.clicked.includes(id)) {
                return true;
            } else {
                return false;
            }
        }






    }

})();
