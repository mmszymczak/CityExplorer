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
        resultVm.pagingNext = [];
        resultVm.pagingState = false;

        activate();

        resultVm.numberPerPage = 9;
        resultVm.maxSize = 5;
        resultVm.currentPage = 1;

        function activate() {
            checkActualCategory($routeParams.item)
                .then(function(route){
                    resultVm.actualCategory = route;
                    getCacheService();
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
            if(resultVm.pagingNext.length > 0) {
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
            resultVm.pagingNext = [];
            //deleteMultipleItems(response);
            resultVm.listByCategory[resultVm.actualCategory] = resultVm.listByCategory[resultVm.actualCategory].concat(response.data);
            cacheService.saveCache(resultVm.actualCategory, resultVm.listByCategory[resultVm.actualCategory]);
            if(response.paging.length > 0){
                angular.forEach(response.paging, function(item){
                    if(item) resultVm.pagingNext.push(item)
                });
            }else{ resultVm.pagingNext = []; }
        }
        //  reemove multiple elements
        // function deleteMultipleItems(response) {
        //     var promises = new Array();
        //     var newArr = [];

        //     angular.forEach(response.data, function(item){
        //         var deferred = $q.defer();
        //         for(var i=0;i<response.data.length;i++){
        //             if(response.data[i].id === item.id){
        //                 console.log(response.data[i].id, item.id, i);

        //                 for(var j=0;j<newArr.length;j++){
        //                     if(newArr[j].id !== item.id){
        //                         newArr.push(response.data[i]);
        //                         deferred.resolve(response.data[i]);
        //                     }
        //                 }
        //             }
        //         }
        //         promises.push(deferred.promise);
        //     });

        //     $q.all(promises)
        //     .then(function(myarray){
        //         console.log(myarray);
        //     });

        // }

        function getCacheService() {
            resultVm.listByCategory = cacheService.getCache();
        }

    }
})();
