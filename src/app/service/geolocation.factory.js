(function(){
    'use strict';

    angular
        .module('project')
        .factory('Geolocation', Geolocation);

    Geolocation.$inject = ['$q', '$window'];

    function Geolocation($q, $window) {
        var currentLocation = {
            getCurrentPosition: getCurrentPosition,
            actualPosition: actualPosition
        };

        return currentLocation;

        function getCurrentPosition() {
            var deferred = $q.defer();

            if (!$window.navigator.geolocation) {
                deferred.reject('Geolocation not supported.');
            } else {
                $window.navigator.geolocation.getCurrentPosition(
                    function (position) {
                        deferred.resolve(position);
                    },
                    function (err) {
                        deferred.reject(err);
                    });
            }
            return deferred.promise;
        }

        function actualPosition() {
            var position = {};
            var deferred = $q.defer();
            getCurrentPosition().then(function(geoposition){
                position.latitude = geoposition.coords.latitude;
                position.longitude = geoposition.coords.longitude;
                currentLocation['position'] = position;
                deferred.resolve(position);
            });
            return deferred.promise;
        }

    }

})();
