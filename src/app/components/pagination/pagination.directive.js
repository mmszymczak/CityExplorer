(function() {
    'use strict';

    angular
        .module('project')
        .directive('morePagination', morePagination);

    function morePagination($timeout, $document,$window) {
        return {
            restrict: 'A',
            scope: true,
            compile: function(elem) { console.log('elem ',elem);
                elem.append('<div class="there-is-more" ng-show="bottom">There is more...</div>');
                return function(scope, element) {console.log('element ',element, ' scope ',scope);
                    var elm = element[0];
                    var check = function() { console.log('check');
                        scope.bottom = !(elm.offsetHeight + elm.scrollTop >= elm.scrollHeight);
                    };
                    var appliedCheck = function() { console.log('appliedcheck');
                        scope.$apply(check);
                    };
                    element.bind('scroll', appliedCheck);
                    check();
                    $timeout(check,500);
                    angular.element($window).bind('resize' , appliedCheck);
                };
            }
        };
    }

})();
