(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);

    function cacheService() {

        var self = this;
        self.list = {
            museum: [],
            bar: [],
            cafe: [],
            club: [],
            hotel: [],
            restaurant: []
        };

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
