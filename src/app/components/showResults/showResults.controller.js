(function() {
  'use strict';

  angular
    .module('project')
    .controller('ResultsController', ResultsController);

  /** @ngInject */
  function ResultsController($timeout, webDevTec, FaceService) {
    var vm = this;

    vm.listByCat = [];

    vm.classAnimation = '';
    vm.getPlaces = getPlaces;


    activate();


    /// paginaTioą
    vm.setPage = function (pageNo) {
        vm.currentPage = pageNo;
    };

    vm.numberPerPage = 5;
    vm.maxSize = 20;
    vm.totalItems = 25;
    vm.currentPage = 1;
    /////



    function getPlaces() {
        FaceService.getPlaces(function(response){
            response.data.forEach(function(data){
                vm.list.push(data);
            });
        });
        webDevTec.takeMyArr(vm.list);
    }

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getWebDevTec() {
      vm.listByCat = webDevTec.getTec();

      angular.forEach(vm.listByCat, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
