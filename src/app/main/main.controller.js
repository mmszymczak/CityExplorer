(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$window', '$timeout', 'FaceService'];

    function MainController($window, $timeout, FaceService) {
        var vm = this;

        vm.list = [];

        vm.classAnimation = '';
        $window.checkLoginState = checkLoginState;
        vm.connected = FaceService.connected;

        activate();

        function checkLoginState() {
            FaceService.checkLoginState();
        }

        function activate() {
            if(typeof FB !== undefined){
                FaceService.initFB();
            }

            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 3000);
        }

    }

})();
