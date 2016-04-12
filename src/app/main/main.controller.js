(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$window', '$timeout', 'webDevTec', 'FaceService'];

    function MainController($window, $timeout, webDevTec, FaceService) {
        var vm = this;

        vm.list = [];

        vm.classAnimation = '';
        $window.checkLoginState = checkLoginState;
        vm.getPlaces = getPlaces;
        vm.getListOfPlaces = getListOfPlaces;

        activate();

        function checkLoginState() {
            FaceService.checkLoginState();
        }

        function activate() {
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
                getPlaces();
            }, 4000);
        }

        function getPlaces() {
            FaceService.getPlaces();

        }

        function getListOfPlaces() {
            vm.list = FaceService.getListOfPlaces();

            webDevTec.takeMyArr(vm.list);
        }

    }

})();
