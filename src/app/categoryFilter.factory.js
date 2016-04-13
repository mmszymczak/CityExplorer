(function(){
    'use strict';

    angular
        .module("project")
        .factory("categoryFilter", categoryFilter);

    categoryFilter.$inject = ['$routeParams'];

    function categoryFilter($routeParams){
        return {
            actualRoute: function() {
                return $routeParams.filter;
            },
            get: function() {console.log($routeParams.filter);
                switch($routeParams.filter){
                    case 'Art':
                        console.log('art');
                        break;
                    case 'Bar':
                        console.log('bar');
                        break;
                    case 'Cafe':
                        console.log('cafe');
                        break;
                }
            }
        }

    };

})();
