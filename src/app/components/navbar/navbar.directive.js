(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceNavBar', ceNavBar);

    function ceNavBar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            controller: 'navBarController',
            controllerAs: 'navBarVm'
        };
        return directive;
  }

})();
