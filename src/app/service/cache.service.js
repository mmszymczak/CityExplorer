(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);

    cacheService.$inject = ['categories'];

    function cacheService(categories) {

        var self = this;
        self.list = {};

        categories.forEach(function(item){
            self.list[item] = [];
        });

        self.getTec = getTec;
        self.saveCache = saveCache;

        function saveCache(category, list){
          self.list[category] = list;
          console.log('cache: ', self.list);
        }

        function getTec() {
          return self.list;
        }

    }

})();
