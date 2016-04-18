(function() {
    'use strict';

    angular
        .module('project')
        .directive('acmeNavbar', acmeNavbar);

    acmeNavbar.$inject = [];

    function acmeNavbar() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/navbar/navbar.html',
            bindToController: true
        };
        return directive;
  }

})();
