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
                        return element.removeClass('hide');
                    });
                    return $scope.$on("loader_hide", function () {
                        return element.addClass('hide');
                    });
                }
            }
        }
})();
