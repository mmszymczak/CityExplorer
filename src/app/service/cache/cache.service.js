(function() {
    'use strict';

    angular
        .module('project')
        .service('cacheService', cacheService);

    cacheService.$inject = ['categories'];

    function cacheService(categories) {

        var self = this;
        self.list = {};
        self.favorite = [];
        self.excursion = [];

        self.getCache = getCache;
        self.saveCache = saveCache;
        self.clearCache = clearCache;
        self.saveFavorite = saveFavorite;
        self.getFavorite = getFavorite;
        self.getTrip = getTrip;
        self.saveTrip = saveTrip;

        clearCache();

        function getFavorite() {
            return self.favorite;
        }

        function saveFavorite(favoriteArr) {
            self.favorite = favoriteArr;
        }

        function getTrip() {
            return self.excursion;
        }

        function saveTrip(tripArr) {
            self.excursion = tripArr;
        }

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
