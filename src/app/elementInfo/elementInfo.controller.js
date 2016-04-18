(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FaceService', 'userService'];

    function ElementInfoController(cacheService, $routeParams, FaceService, userService) {
        var vm = this;

        vm.elemInfo = [];
        vm.actualCategory = $routeParams.item;
        vm.position = {};

        activate();

        function activate() {
            if(typeof FB === 'undefined'){
                FaceService.initFB()
                    .then(function(response){
                        if(response === 'connected'){
                            detailsRequest();
                        }else{
                            FaceService.loginFB();
                        }
                    });
            }else if(!userService.connected) {
                FaceService.loginFB();
                $window.location.href = '#/';
            }else { detailsRequest(); }
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
