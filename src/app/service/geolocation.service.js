(function(){
    'use strict';

    angular
        .module('project')
        .factory('GeolocationService', GeolocationService);

    GeolocationService.$inject = ['$q', '$window'];

    function GeolocationService($q, $window) {
        var currentLocation = {
            getCurrentPosition: getCurrentPosition,
            actualPosition: actualPosition,
            markerPosition: markerPosition,
            positionFlag: false
        };

        return currentLocation;

        function markerPosition(lat, lng) {
            var position = {};
            position.latitude = lat;
            position.longitude = lng;
            currentLocation['position'] = position;
            currentLocation.positionFlag = true;
        }

        function getCurrentPosition() {
            var deferred = $q.defer(),
                lng = geoplugin_longitude(),
                lat = geoplugin_latitude(),
                geoPosition = {
                    coords: {
                        latitude: lat,
                        longitude: lng
                    }
                };
            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function () {
                        deferred.resolve(geoPosition);
                    });
            }
            return deferred.promise;
        }

        function actualPosition() {
            var position = {};
            var deferred = $q.defer();
            if(!currentLocation.positionFlag){
                getCurrentPosition().then(function(geoposition){
                    position.latitude = geoposition.coords.latitude;
                    position.longitude = geoposition.coords.longitude;
                    currentLocation['position'] = position;
                    deferred.resolve(position);
                });
            }else{
                deferred.resolve(currentLocation.position);
            }
            return deferred.promise;
        }

    }

})();
