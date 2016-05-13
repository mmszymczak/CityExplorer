(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'errorHandling', 'FacebookService', 'userService', 'googleMapPositionService', '$localStorage', 'firebaseService'];

    function ElementInfoController(cacheService, $routeParams, errorHandling, FacebookService, userService, googleMapPositionService, $localStorage, firebaseService) {
        var infoVm = this;

        infoVm.elemInfo = [];

        infoVm.actualCategory = $routeParams.item;
        infoVm.position = {};
        infoVm.googleMapApiReady = false;
        infoVm.isPosts = false;
        infoVm.showPosts = showPosts;

        infoVm.addFavorite = addFavorite;
        infoVm.$storage = $localStorage;
        infoVm.$storage.items = infoVm.$storage.items || [];
        infoVm.hideButtonAddFav = hideButtonAddFav;

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

        function addFavorite(item) {
            item.favorite = true;
            infoVm.$storage.items.push(item);
            firebaseService.addToFavorite(item);
        }

        function hideButtonAddFav(item) {
            var hideButton = false;
            infoVm.$storage.items.forEach(function(element) {
                if (element.id === item.id && element.favorite) {
                    hideButton = true;
                }
            });
            return hideButton;
        }

    }

})();
