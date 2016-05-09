(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService'];

    function MainController($scope, FacebookService, userService, googleMapPositionService) {
        var mainVm = this;

        mainVm.list = [];

        mainVm.logInFB = logInFB;
        mainVm.user = userService.user;
        mainVm.fbService = FacebookService;
        mainVm.googleMapApiReady = false;

        activate();

        function activate() {
            FacebookService.checkLoginState();
            initGoogleMapApi();
        }

        function initGoogleMapApi() {
            googleMapPositionService.onReady()
            .then(function(){
                mainVm.googleMapApiReady = true;
            });
        }

        function logInFB() {
            FacebookService.login();
        }

    }

})();
