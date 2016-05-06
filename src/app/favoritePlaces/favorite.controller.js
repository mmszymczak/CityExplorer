(function() {
    'use strict';

    angular
        .module('project')
        .controller('FavoritePlacesController', FavoritePlacesController);

    FavoritePlacesController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService', 'cacheService', '$localStorage', '$sessionStorage', 'errorHandling'];

    function FavoritePlacesController($scope, FacebookService, userService, googleMapPositionService, cacheService, $localStorage, $sessionStorage, errorHandling) {
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

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    favoriteVm.ready = true;
                    initGoogleMapApi();
                    checkFBState();
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
           	favoriteVm.favoriteList[index] = obj;
            favoriteVm.favoriteList[otherIndex] = otherObj;
	    }

        function checkFBState() {
            FacebookService.checkLoginState()
                .then(function(){
                    detailsRequest();
                });
        }
	    function detailsRequest() {	
		    favoriteVm.$storage.items.forEach(function(element,index, array) {
		    	FacebookService.getDetails(element.id)
	                .then(function(response){
	                    return response;
	                })
	                .then(function(data){
	                    favoriteVm.position.lng = data.location.longitude;
	                    favoriteVm.position.lat = data.location.latitude;
	                	favoriteVm.listOfObjectPlaces.push(data.location);
	                	//// problem with response ///
	                })
	                .catch(function(err){
	                    errorHandling.errorFunc(err);
	                	console.log(1);
	                });
	    	});
        }
        console.log(favoriteVm.listOfObjectPlaces);
        /// resolve/resolveAs in index.route, to load this data first



    }

})();
