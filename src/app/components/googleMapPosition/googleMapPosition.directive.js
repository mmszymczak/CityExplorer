(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMapPosition', ceGoogleMapPosition);

    ceGoogleMapPosition.$inject = ['GeolocationService', 'cacheService'];

    function ceGoogleMapPosition(GeolocationService, cacheService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMapPosition/googleMapPosition.html',

            link: function(scope){

                GeolocationService.actualPosition()
                .then(function(position){
                    scope.actualCity = geoplugin_city();
                    scope.actualCountry = geoplugin_countryName();

                    var map = new google.maps.Map(document.getElementById("map_canvas"), {
                        zoom: 12,
                        center: new google.maps.LatLng(position.latitude, position.longitude),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });

                    var myMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.latitude, position.longitude),
                        draggable: true
                    });

                    google.maps.event.addListener(myMarker, 'dragend', function (evt) {
                        GeolocationService.markerPosition(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3));
                        cacheService.clearCache();
                    });

                    map.setCenter(myMarker.position);
                    myMarker.setMap(map);
                });
            }
        };
        return directive;
    }

})();
