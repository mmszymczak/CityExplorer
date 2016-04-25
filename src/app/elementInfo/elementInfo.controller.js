(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FacebookService', 'userService', 'googleMapService'];

    function ElementInfoController(cacheService, $routeParams, FacebookService, userService, googleMapService) {
        var infoVm = this;

        infoVm.elemInfo = [];
        infoVm.actualCategory = $routeParams.item;
        infoVm.position = {};
        infoVm.googleMapApiReady = false;
        infoVm.loadPosts = false;
        infoVm.loadComments = loadComments;

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
        }

        function loadComments(){
            if(!infoVm.loadPosts){
                FacebookService.getComments($routeParams.element)
                    .then(function(response){
                        infoVm.elemInfo['posts'] = response;
                        infoVm.loadPosts = true;
                    });
                }else{
                    infoVm.loadPosts = false;
                }
        }

        function initGoogleMapApi() {
            googleMapService.onReady().then(function(){
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
