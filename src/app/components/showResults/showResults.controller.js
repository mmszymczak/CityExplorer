(function() {
    'use strict';

    angular
        .module('project')
        .controller('ShowResultsController', ShowResultsController);

    ShowResultsController.$inject = ['$timeout', 'cacheService', 'FacebookService', '$routeParams'];

    function ShowResultsController($timeout, cacheService, FacebookService, $routeParams) {
        var resultVm = this;

        resultVm.listByCategory = {};
        resultVm.actualCategory = $routeParams.item;

        activate();

        resultVm.numberPerPage = 9;
        resultVm.maxSize = 5;
        resultVm.totalItems = resultVm.listByCategory[$routeParams.item].length;
        resultVm.currentPage = 1;

        function activate() {
            getCacheService();
            checkFBState();
        }

        function checkFBState() {
            FacebookService.checkLoginState()
                .then(function(){
                    routeTypeRequest();
                });
        }

        function routeTypeRequest() {
            var capitalLetter = resultVm.actualCategory.charAt(0).toUpperCase() + resultVm.actualCategory.slice(1);
            var method = 'get'+capitalLetter+'s';

            resultVm.route = resultVm.actualCategory;
            if(resultVm.listByCategory[resultVm.actualCategory].length === 0){
                FacebookService[method]()
                    .then( function(response){
                        resultVm.listByCategory[resultVm.actualCategory] = resultVm.listByCategory[resultVm.actualCategory].concat(response.data);
                        cacheService.saveCache(resultVm.actualCategory, resultVm.listByCategory[resultVm.actualCategory]);
                        resultVm.totalItems = resultVm.listByCategory[resultVm.actualCategory].length;
                    });
            }
        }

        function getCacheService() {
          resultVm.listByCategory = cacheService.getTec();

          angular.forEach(resultVm.listByCategory, function(awesomeThing) {
            awesomeThing.rank = Math.random();
          });
        }
    }
})();
