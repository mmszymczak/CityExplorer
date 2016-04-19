(function() {
    'use strict';

    angular
        .module('project')
        .directive('viewWrapper', viewWrapper);

    viewWrapper.$inject = [];

    function viewWrapper() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/ngviewContainer/ngviewContainer.html',
            controller: 'ViewContainerController',
            controllerAs: 'containerCtrl'
        };
        return directive;
    }

})();
