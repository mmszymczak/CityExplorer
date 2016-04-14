(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = [];

    function CategoryController() {
        var vm = this;

        vm.categories = ['museum', 'bar', 'cafe', 'club', 'hotel', 'restaurant'];

    }


})();
