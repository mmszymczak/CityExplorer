(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', '$route', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$localStorage', '$sessionStorage'];

    function FavoritePlacesController($scope, $route, FacebookService, userService, googleMapPositionService, cacheService, $localStorage) {
        var favoriteVm = this;

        favoriteVm.$storage = $localStorage;
        favoriteVm.favoriteList = favoriteVm.$storage.items;
        favoriteVm.user = userService.user;
        favoriteVm.removeFavorite = removeFavorite;
        favoriteVm.ready = false;
        favoriteVm.googleMapApiReady;
        favoriteVm.state;
        favoriteVm.onDropComplete = onDropComplete;
        favoriteVm.activate = activate;
        favoriteVm.addToMap = addToMap;
        favoriteVm.$storage.clicked = favoriteVm.$storage.clicked || [];
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
            favoriteVm.$storage.items.forEach(function(element,index){
                if (item.id === element.id) {
                    favoriteVm.indexToDelete = index;
                }
            });
            favoriteVm.$storage.items.splice(favoriteVm.indexToDelete, 1);

            if (favoriteVm.$storage.clicked.includes(item.id)) {
                favoriteVm.$storage.clicked.forEach(function(element,index){
                    if (item.id === element) {
                        favoriteVm.indexToDelete = index;
                    }
                });
                favoriteVm.$storage.clicked.splice(favoriteVm.indexToDelete, 1);
            }
        }


		function onDropComplete(index, obj){
		var otherObj = favoriteVm.favoriteList[index],
			otherIndex = favoriteVm.favoriteList.indexOf(obj);
		favoriteVm.favoriteList[index] = obj;
		favoriteVm.favoriteList[otherIndex] = otherObj;
		}

        function addToMap(id) {
            if (favoriteVm.$storage.clicked.includes(id)) {
                favoriteVm.$storage.clicked = favoriteVm.$storage.clicked.filter(function(element) {
                    return (element !== id);
                });
            } else {
                favoriteVm.$storage.clicked.push(id);
            }
        }

        function checkIfClicked(id){
            return favoriteVm.$storage.clicked.includes(id)
        }


        function checkDisable(id){
            var check = favoriteVm.limitToCheck,
                clickedLength = favoriteVm.$storage.clicked.length,
                includesId = favoriteVm.$storage.clicked.includes(id);

            return check === clickedLength && !includesId;
        }

    }

})();
