(function() {
    'use strict';

    angular
        .module('project')
        .directive('viewWrapper', viewWrapper);

    function viewWrapper() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/ngviewContainer/ngviewContainer.html'
        };
        return directive;
    }

})();
