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


        activate();

        function checkLoginState() {
            FaceService.checkLoginState();
        }

        function activate() {
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

    }

})();
