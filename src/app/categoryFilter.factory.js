(function(){
    'use strict';

    angular
        .module('project')
        .factory('categoryFilter', categoryFilter);

    categoryFilter.$inject = ['$routeParams', 'FaceService'];

    function categoryFilter($routeParams, FaceService){
        return {
            actualRoute: function() {
                return $routeParams.item;
            },
            get: function(method, callback) {
                FaceService[method](callback);
            }

        }

    }

})();
