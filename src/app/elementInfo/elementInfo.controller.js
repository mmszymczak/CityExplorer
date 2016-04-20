(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FacebookService', 'userService', 'googleMapService', '$window'];

    function ElementInfoController(cacheService, $routeParams, FacebookService, userService, googleMapService, $window) {
        var infoVm = this;

        infoVm.elemInfo = [];
        infoVm.actualCategory = $routeParams.item;
        infoVm.position = {};
        infoVm.googleMapApiReady = false;

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
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
