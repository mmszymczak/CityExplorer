(function() {
    'use strict';

    angular
        .module('project')
        .controller('ShowResultsController', ShowResultsController);

    ShowResultsController.$inject = ['$timeout', 'cacheService', 'FaceService', '$routeParams', 'userService'];

    function ShowResultsController($timeout, cacheService, FaceService, $routeParams, userService) {
        var vm = this;

        vm.listByCategory = {};
        vm.actualCategory = $routeParams.item;

        activate();

        vm.numberPerPage = 9;
        vm.maxSize = 5;
        vm.totalItems = vm.listByCategory[$routeParams.item].length;
        vm.currentPage = 1;

        function activate() {
            getCacheService();
            checkFBState();
        }

        function checkFBState() {
            FaceService.checkLoginState()
            .then(function(){
                routeTypeRequest();
            });
        }

        function routeTypeRequest() {
            var capitalLetter = vm.actualCategory.charAt(0).toUpperCase() + vm.actualCategory.slice(1);
            var method = 'get'+capitalLetter+'s';

            vm.route = vm.actualCategory;
            if(vm.listByCategory[vm.actualCategory].length === 0){
                FaceService[method]()
                    .then( function(response){
                        vm.listByCategory[vm.actualCategory] = vm.listByCategory[vm.actualCategory].concat(response.data);
                        cacheService.saveCache(vm.actualCategory, vm.listByCategory[vm.actualCategory]);
                        vm.totalItems = vm.listByCategory[vm.actualCategory].length;
                    });
            }
        }

        function getCacheService() {
          vm.listByCategory = cacheService.getTec();

          angular.forEach(vm.listByCategory, function(awesomeThing) {
            awesomeThing.rank = Math.random();
          });
        }
    }
})();
