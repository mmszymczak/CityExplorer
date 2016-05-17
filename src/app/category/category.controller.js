(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['FacebookService', 'errorHandling', 'categories', 'cacheService'];

    function CategoryController(FacebookService, errorHandling, categories, cacheService) {
        var categoryVm = this;

        categoryVm.rangeModel = FacebookService.rangeDistance;
        categoryVm.categories = categories;
        categoryVm.setRange = setRange;
        categoryVm.ready = false;
        categoryVm.findQuery = findQuery;

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    categoryVm.ready = true;
                });
        }

        function setRange() {
            cacheService.clearCache();
            FacebookService.setRange(categoryVm.rangeModel);
        }

        function findQuery() {

        }
    }

})();
