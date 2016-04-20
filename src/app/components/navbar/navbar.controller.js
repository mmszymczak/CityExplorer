(function(){
    'use strict';

    angular
        .module('project')
        .controller('navBarController', navBarController);

    navBarController.$inject = ['userService', 'FacebookService'];

    function navBarController(userService, FacebookService){
        var navBarVm = this;

        navBarVm.user = userService.user;
        navBarVm.logoutFB = logoutFB;

        function logoutFB() {
            FacebookService.logout();
        }
    }



})();
