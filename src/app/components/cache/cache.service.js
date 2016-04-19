(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);


    function cacheService() {

        var vm = this;
        vm.list = {
            museum: [],
            bar: [],
            cafe: [],
            club: [],
            hotel: [],
            restaurant: []
        };

        vm.getTec = getTec;
        vm.saveCache = saveCache;

        function saveCache(category, list){
          vm.list[category] = list;
          console.log('cache: ', vm.list);
        }

        function getTec() {
          return vm.list;
        }

    }

})();
