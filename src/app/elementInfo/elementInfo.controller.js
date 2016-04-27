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

        // do dyrektywy
        infoVm.userInfo = userService.user;
        infoVm.showComments = showComments;
        infoVm.isComments = false;
        infoVm.rate = 0;
        infoVm.readOnly = true;
        infoVm.commentRate = 3;
        //

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
        }

        function showComments() {
            if(!infoVm.isComments){
                infoVm.isComments = true;
            }else{
                infoVm.isComments = false;
            }
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
