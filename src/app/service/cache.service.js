(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);

    cacheService.$inject = ['categories'];

    function cacheService(categories) {

        var self = this;
        self.list = {};

        self.getCache = getCache;
        self.saveCache = saveCache;
        self.clearCache = clearCache;

        clearCache();

        function saveCache(category, list){
            self.list[category] = list;
        }

        function getCache() {
            return self.list;
        }

        function clearCache() {
            categories.forEach(function(item){
                self.list[item] = [];
            });
        }

    }

})();
