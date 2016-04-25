(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);

    cacheService.$inject = ['categories'];

    function cacheService(categories) {

        var self = this;
        self.list = {};
        self.getTec = getTec;
        self.saveCache = saveCache;
        self.clearCache = clearCache;

        buildingScaffolding();

        function buildingScaffolding(){
            categories.forEach(function(item){
                self.list[item] = [];
            });
        }

        function saveCache(category, list){
          self.list[category] = list;
          console.log('cache: ', self.list);
        }

        function getTec() {
          return self.list;
        }

        function clearCache() {
            buildingScaffolding();
        }

    }

})();
