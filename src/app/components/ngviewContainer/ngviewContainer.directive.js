(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceNgViewContainer', ceNgViewContainer);

    function ceNgViewContainer() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/ngviewContainer/ngviewContainer.html'
        };
        return directive;
    }

})();
