(function() {
    'use strict';

    angular
        .module('project')
        .directive('navBar', navBar);

    navBar.$inject = ['userService', 'FaceService'];

    function navBar(userService, FaceService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            bindToController: true,
            controller: function(){
                var vm = this;
                vm.user = userService.user;
                vm.logoutFB = logoutFB;

                function logoutFB() {
                    FaceService.logoutFB();
                }
            },
            controllerAs: 'navCtrl'
        };
        return directive;
  }

})();
