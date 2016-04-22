(function() {
    'use strict';

    angular
        .module('project')
        .directive("spinner", spinner);

        function spinner() {
            return {
                restrict: 'A',
                link: function($scope, element) {
                    $scope.$on("loader_show", function () {
                        //console.log('show');
                        return element.removeClass('hide');
                    });
                    return $scope.$on("loader_hide", function () {
                        //console.log('hide');
                        return element.addClass('hide');
                    });
                }
            }
        }
})();
