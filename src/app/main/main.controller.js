(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$timeout', 'FaceService'];

    function MainController($timeout, FaceService) {
        var vm = this;

        vm.list = [];

        vm.classAnimation = '';
        vm.loginFB = loginFB;
        vm.logoutFB = logoutFB;
        vm.connected = FaceService.connected;

        activate();

        function loginFB() {
            FaceService.loginFB();
        }

        function logoutFB() {
            FaceService.logoutFB();
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
