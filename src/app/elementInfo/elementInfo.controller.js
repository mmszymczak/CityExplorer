(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'errorHandling', 'FacebookService', 'userService', 'googleMapPositionService', 'firebaseService'];

    function ElementInfoController(cacheService, $routeParams, errorHandling, FacebookService, userService, googleMapPositionService, firebaseService) {
        var infoVm = this;

        infoVm.elemInfo = [];

        infoVm.actualCategory = $routeParams.item;
        infoVm.position = {};
        infoVm.googleMapApiReady = false;
        infoVm.isPosts = false;
        infoVm.showPosts = showPosts;

        infoVm.addFavorite = addFavorite;
        infoVm.addToTrip = addToTrip;
        infoVm.favoriteBtnState = false;
        infoVm.tripBtnState = false;

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
        }

        function showPosts(){
            if(!infoVm.isPosts){
                infoVm.isPosts = true;
                if(typeof infoVm.elemInfo.posts == 'undefined' || infoVm.elemInfo.posts.length == 0){
                    FacebookService.getComments($routeParams.element)
                        .then(function(response){
                            infoVm.elemInfo['posts'] = response;
                        })
                        .catch(function(err){
                            errorHandling.errorFunc(err);
                        });
                }
            }else{
                infoVm.isPosts = false;
            }
        }

        function initGoogleMapApi() {
            googleMapPositionService.onReady().then(function(){
                infoVm.googleMapApiReady = true;
            });
        }

        function checkFBState() {
            FacebookService.checkLoginState()
                .then(function(){
                    detailsRequest();
                    checkFavoriteState($routeParams.element);
                    checkTripState($routeParams.element);
                });
        }

        function detailsRequest() {
            FacebookService.getDetails($routeParams.element)
                .then(function(response){
                    infoVm.elemInfo = response;
                    return response;
                })
                .then(function(data){
                    infoVm.position.lng = data.location.longitude;
                    infoVm.position.lat = data.location.latitude;
                })
                .catch(function(err){
                    errorHandling.errorFunc(err);
                });
        }

        function addToTrip(item) {
            item.trip = true;
            item.showOnMap = false;
            infoVm.tripBtnState = true;
            firebaseService.addToTrip(item);
        }

        function addFavorite(item) {
            item.favorite = true;
            infoVm.favoriteBtnState = true;
            firebaseService.addToFavorite(item);
        }

        function checkFavoriteState(itemId) {
            cacheService.favorite.forEach(function(element) {
                if (element.id === itemId && element.favorite) {
                    infoVm.favoriteBtnState = true;
                }
            });
        }

        function checkTripState(itemId) {
            cacheService.excursion.forEach(function(element) {
                if (element.id === itemId && element.trip) {
                    infoVm.tripBtnState = true;
                }
            });
        }

    }

})();
