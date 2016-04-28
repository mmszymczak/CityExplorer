(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FacebookService', 'userService', 'googleMapPositionService'];

    function ElementInfoController(cacheService, $routeParams, FacebookService, userService, googleMapPositionService) {
        var infoVm = this;

        infoVm.elemInfo = [];

        infoVm.actualCategory = $routeParams.item;
        infoVm.position = {};
        infoVm.googleMapApiReady = false;
        infoVm.isPosts = false;
        infoVm.showPosts = showPosts;

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
        }

        function showPosts(){
            if(!infoVm.isPosts){
                infoVm.isPosts = true;
                if(typeof infoVm.elemInfo.posts == 'undefined' || infoVm.elemInfo.posts.lenth == 0){
                    FacebookService.getComments($routeParams.element)
                        .then(function(response){
                            infoVm.elemInfo['posts'] = response;
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
                });
        }

    }

})();
