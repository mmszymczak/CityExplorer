(function() {
    'use strict';

    angular
        .module('project')
        .controller('ShowResultsController', ShowResultsController);

    ShowResultsController.$inject = ['$q', 'categories', '$window', 'cacheService', 'FacebookService', '$routeParams'];

    function ShowResultsController($q, categories, $window, cacheService, FacebookService, $routeParams) {
        var resultVm = this;

        resultVm.listByCategory = {};
        resultVm.actualCategory = '';
        resultVm.loadMoreData = loadMoreData;
        resultVm.pagingNext = '';
        resultVm.busy = false;

        activate();

        resultVm.numberPerPage = 9;
        resultVm.maxSize = 5;
        resultVm.totalItems = null;
        resultVm.currentPage = 1;

        function activate() {
            checkActualCategory($routeParams.item)
                .then(function(route){
                    resultVm.actualCategory = route;
                    getCacheService();
                    resultVm.totalItems = resultVm.listByCategory[route].length;
                    checkFBState();
                });
        }

        function checkActualCategory(route){
            var deferred = $q.defer();
            if (categories.indexOf(route) > -1) {
                deferred.resolve(route);
            } else {
                $window.location.href = '#/category';
            }
            return deferred.promise;
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
                        loadCheckSave(response);
                    });
            }
        }

        function loadMoreData() {
            if(typeof resultVm.pagingNext != 'undefined') {
                resultVm.busy = true;
                FacebookService.getMoreData(resultVm.pagingNext)
                    .then(function(response){
                        loadCheckSave(response);
                        resultVm.busy = false;
                    });
            }
        }

        function loadCheckSave(response){
            resultVm.listByCategory[resultVm.actualCategory] = resultVm.listByCategory[resultVm.actualCategory].concat(response.data);
            cacheService.saveCache(resultVm.actualCategory, resultVm.listByCategory[resultVm.actualCategory]);
            resultVm.totalItems = resultVm.listByCategory[resultVm.actualCategory].length;
            if(response.paging){
                resultVm.pagingNext = response.paging.next;
            }else{ resultVm.pagingNext = undefined; }
        }

        function getCacheService() {
          resultVm.listByCategory = cacheService.getTec();

          angular.forEach(resultVm.listByCategory, function(awesomeThing) {
            awesomeThing.rank = Math.random();
          });
        }
    }
})();
