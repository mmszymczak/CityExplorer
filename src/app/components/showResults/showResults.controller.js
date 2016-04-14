(function() {
  'use strict';

  angular
    .module('project')
    .controller('ShowResultsController', ShowResultsController);

  /** @ngInject */
  function ShowResultsController($timeout, cacheService, FaceService, $routeParams, categoryFilter) {
    var vm = this;

    vm.listByCategory = {};
    vm.classAnimation = '';

    activate();

    vm.numberPerPage = 6;
    vm.maxSize = 5;
    vm.totalItems = vm.listByCategory[$routeParams.item].length;
    vm.currentPage = 1;

    function activate() {

        getCacheService();
        routeTypeRequest();

        $timeout(function() {
            vm.classAnimation = 'rubberBand';
        }, 4000);
    }

    function routeTypeRequest() {

        var actualCategory = $routeParams.item;
        var capitalLetter = actualCategory.charAt(0).toUpperCase() + actualCategory.slice(1);
        var method = 'get'+capitalLetter+'s';

        vm.route = actualCategory;
        if(vm.listByCategory[actualCategory].length === 0){
            categoryFilter.get(method, function(response){
                vm.listByCategory[actualCategory] = vm.listByCategory[actualCategory].concat(response.data);
                cacheService.saveCache(actualCategory, vm.listByCategory[actualCategory]);
                vm.totalItems = vm.listByCategory[actualCategory].length;
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
