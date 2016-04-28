(function(){
    'use strict';

    angular
        .module('project')
        .directive('ceElementComments', ceElementComments);

    function ceElementComments() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/comments/comments.html',
            controller: 'ElementCommentsController',
            controllerAs: 'elemComVm'
        };
        return directive;
    }

})();
