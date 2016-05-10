(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['FacebookService', 'userService', 'googleMapPositionService', '$localStorage'];

    function FavoritePlacesController(FacebookService, userService, googleMapPositionService, $localStorage) {
        var favoriteVm = this;

        favoriteVm.$storage = $localStorage;
        favoriteVm.favoriteList = favoriteVm.$storage.items;
        favoriteVm.user = userService.user;
        favoriteVm.removeFavorite = removeFavorite;
        favoriteVm.googleMapApiReady = false;
        favoriteVm.onDropComplete = onDropComplete;
        favoriteVm.addToMap = addToMap;
        favoriteVm.$storage.clicked = favoriteVm.$storage.clicked || [];
        favoriteVm.checkIfClicked = checkIfClicked;
        favoriteVm.limitToCheck = 9;
        favoriteVm.checkDisable = checkDisable;

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    initGoogleMapApi();
                });
        }

        function initGoogleMapApi() {
            googleMapPositionService.onReady()
            .then(function(){
                favoriteVm.googleMapApiReady = true;
            });
        }

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
