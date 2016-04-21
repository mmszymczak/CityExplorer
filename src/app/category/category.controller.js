(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['FacebookService', 'categories'];

    function CategoryController(FacebookService, categories) {
        var categoryVm = this;

        categoryVm.categories = categories;

        FacebookService.checkLoginState();
    }

})();
