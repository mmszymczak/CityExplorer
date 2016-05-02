(function() {
    'use strict';

    angular
        .module('project')
        .controller('ShowResultsController', ShowResultsController);

    ShowResultsController.$inject = ['$q', 'categories', '$location', '$window', 'errorHandling', 'cacheService', 'FacebookService', '$routeParams'];

    function ShowResultsController($q, categories, $location, $window, errorHandling, cacheService, FacebookService, $routeParams) {
        var resultVm = this;

        resultVm.listByCategory = {};
        resultVm.actualCategory = '';
        resultVm.loadMoreData = loadMoreData;
        resultVm.pagingNext = '';

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
                })
                .catch(function(response){
                    errorHandling.errorFunc(response);
                });
        }

        function checkActualCategory(route){
            var deferred = $q.defer();
            if (categories.indexOf(route) > -1) {
                deferred.resolve(route);
            } else {
                //$location.path('category'); dlaczemu po tym przekierowaniu robi milion zapytan do FBapi :C idk
                deferred.reject('Actual category didnt exist in our service, please change category.');
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
                    })
                    .catch(function(err){
                        errorHandling.errorFunc(err);
                    });
            }
        }

        function loadMoreData() {
            if(typeof resultVm.pagingNext != 'undefined') {
                FacebookService.getMoreData(resultVm.pagingNext)
                    .then(function(response){
                        loadCheckSave(response);
                    })
                    .catch(function(err){
                        errorHandling.errorFunc(err);
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
