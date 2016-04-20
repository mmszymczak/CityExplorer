(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FaceService', 'userService', 'googleMapService', '$window'];

    function ElementInfoController(cacheService, $routeParams, FaceService, userService, googleMapService, $window) {
        var vm = this;

        vm.elemInfo = [];
        vm.actualCategory = $routeParams.item;
        vm.position = {};
        vm.googleMapApiReady = false;

        activate();

        function activate() {
            checkFBState();
            initGoogleMapApi();
        }

        function initGoogleMapApi() {
            googleMapService.onReady().then(function(){
                vm.googleMapApiReady = true;
            });
        }

        function checkFBState() {
            FaceService.checkLoginState()
            .then(function(){
                detailsRequest();
            });
        }

        function detailsRequest() {
            FaceService.getDetails($routeParams.element)
                .then(function(response){
                    vm.elemInfo = response;
                    return response;
                })
                .then(function(data){
                    vm.position.lng = data.location.longitude;
                    vm.position.lat = data.location.latitude;
                });
        }

    }

})();
