(function(){
    'use strict';

    angular
        .module('project')
        .directive('ceFooter', ceFooter);

    ceFooter.$inject = [];

    function ceFooter() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/footer/footer.html',
            controller: ['$scope', '$anchorScroll', function($scope, $anchorScroll) {
                $scope.moveToTop = function() {
                    $anchorScroll();
                };
            }]
        }
        return directive;
    }

})();
