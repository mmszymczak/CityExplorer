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

        self.getCache = getCache;
        self.saveCache = saveCache;
        self.clearCache = clearCache;
        self.pushFavorite = pushFavorite;
        self.getFavorite = getFavorite;


        buildingScaffolding();

        function buildingScaffolding(){
            categories.forEach(function(item){
                self.list[item] = [];
            });
        }

        function saveCache(category, list){
            self.list[category] = list;
        }

        function getCache() {
            return self.list;
        }

        function clearCache() {
            buildingScaffolding();
        }

        function pushFavorite(item) {
            self.favorite.push(item);
            console.log(self.favorite);
        }

        function getFavorite() {
            return self.favorite;
        }

    }

})();
