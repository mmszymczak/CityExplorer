(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['FacebookService'];

    function CategoryController(FacebookService) {
        var categoryVm = this;

        categoryVm.categories = ['museum', 'bar', 'cafe', 'club', 'hotel', 'restaurant'];

        FacebookService.checkLoginState();
    }

})();
