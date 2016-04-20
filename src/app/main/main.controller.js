(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$timeout', 'FacebookService', 'userService'];

    function MainController($timeout, FacebookService, userService) {
        var mainVm = this;

        mainVm.list = [];

        mainVm.loginFB = loginFB;
        mainVm.logoutFB = logoutFB;
        mainVm.user = userService.user;
        mainVm.fbService = FacebookService;

        activate();

        function loginFB() {
            FacebookService.login();
        }

        function logoutFB() {
            FacebookService.logout();
        }

        function activate() {
            FacebookService.checkLoginState();
        }

    }

})();
