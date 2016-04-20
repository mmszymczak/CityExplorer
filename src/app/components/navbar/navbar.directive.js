(function() {
    'use strict';

    angular
        .module('project')
        .directive('navBar', navBar);

    function navBar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            controller: 'navBarController',
            controllerAs: 'navBarVm'
        };
        return directive;
  }

})();
