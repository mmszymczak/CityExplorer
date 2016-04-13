(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$window', '$timeout', 'webDevTec', 'FaceService', 'Geolocation'];

    function MainController($window, $timeout, webDevTec, FaceService, Geolocation) {
        var vm = this;

        vm.list = [];

        vm.classAnimation = '';
        $window.checkLoginState = checkLoginState;
        vm.getPlaces = getPlaces;
        vm.getLoc = getLoc;

        activate();

        function checkLoginState() {
            FaceService.checkLoginState();
        }

        function activate() {
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function getPlaces() {
            FaceService.getPlaces(function(response){
                response.data.forEach(function(data){
                    vm.list.push(data);
                });
            });
            webDevTec.takeMyArr(vm.list);
        }

        function getLoc() {
            console.log(Geolocation.position);
        }

    }

})();
