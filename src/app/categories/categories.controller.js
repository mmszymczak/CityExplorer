(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['categoryFilter'];

    function CategoryController(categoryFilter) {
        var vm = this;

        vm.categories = ['Art', 'Bar', 'Cafe', 'Club', 'Hotel', 'Restaurant'];
        vm.getCategory = getCategory;

        function getCategory() {
            categoryFilter.get();
        }
    }


})();
