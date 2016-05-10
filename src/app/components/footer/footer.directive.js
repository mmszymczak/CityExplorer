(function(){
    'use strict';

    angular
        .module('project')
        .directive('ceFooter', ceFooter);

    ceFooter.$inject = [];

    function ceFooter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/footer/footer.html'
        }
        return directive;
    }

})();
