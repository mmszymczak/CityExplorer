(function() {

    'use strict';

    angular
        .module('project')
        .service('googleMapService', googleMapService);

    googleMapService.$inject = ['$q','$window'];

    function googleMapService($q, $window) {
        var apiReady = $q.defer();

        activate();

        this.onReady = onReady;

        function onReady() {
            return apiReady.promise;
        }

        function activate() {
            var tag = document.createElement('script');
            tag.src = "https://maps.googleapis.com/maps/api/js?callback=initMap";
            var firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
            $window.initMap = apiReady.resolve;
        }
    }
})();
