(function() {
    'use strict';

    angular
        .module('project')
        .service('webDevTec', webDevTec);


    function webDevTec() {

        var vm = this;
        vm.list = [];

        vm.getTec = getTec;
        vm.takeMyArr = takeMyArr;

        function takeMyArr(list){
          vm.list = list;
        }


        function getTec() {
          return vm.list;
        }

    }

})();
