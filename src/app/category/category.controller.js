(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['FacebookService', 'categories', 'cacheService'];

    function CategoryController(FacebookService, categories, cacheService) {
        var categoryVm = this;

        categoryVm.rangeModel = FacebookService.rangeDistance;
        categoryVm.categories = categories;
        categoryVm.setRange = setRange;

        FacebookService.checkLoginState();

        function setRange() {
            cacheService.clearCache();
            FacebookService.setRange(categoryVm.rangeModel);
        }
    }

})();
