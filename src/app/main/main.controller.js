(function() {
    'use strict';

    angular
        .module('project')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'FacebookService', 'userService', 'googleMapPositionService'];

    function MainController($scope, FacebookService, userService, googleMapPositionService) {
        var mainVm = this;

        mainVm.list = [];

        mainVm.logInOutFB = logInOutFB;
        mainVm.user = userService.user;
        mainVm.fbService = FacebookService;
        mainVm.header = '';
        mainVm.googleMapApiReady = false;

        FacebookService.checkLoginState();
        initGoogleMapApi();

        $scope.$watch(function(){
            return mainVm.user.connected;
        }, function(state){
            suitableHeader(state);
            mainVm.state = state;
            if(state) mainVm.value = 'Logout';
            else mainVm.value = 'Login';
        });

        function initGoogleMapApi() {
            googleMapPositionService.onReady()
            .then(function(){
                mainVm.googleMapApiReady = true;
            });
        }

        function suitableHeader(state){
            if(state) mainVm.header = 'Leave your account';
            else mainVm.header = 'Sign in with facebook account';
        }

        function logInOutFB() {
            if(mainVm.state) FacebookService.logout();
            else FacebookService.login();
        }

    }

})();
