(function(){
    'use strict';

    angular
        .module('project')
        .controller('CategoryController', CategoryController);

    CategoryController.$inject = ['FaceService'];

    function CategoryController(FaceService) {
        var vm = this;

        vm.categories = ['museum', 'bar', 'cafe', 'club', 'hotel', 'restaurant'];

        FaceService.checkLoginState();
    }


})();
