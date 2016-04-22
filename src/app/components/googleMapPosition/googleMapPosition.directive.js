(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMapPosition', ceGoogleMapPosition);

    ceGoogleMapPosition.$inject = ['GeolocationService'];

    function ceGoogleMapPosition(GeolocationService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMapPosition/googleMapPosition.html',

            link: function(scope){

                var lat = geoplugin_latitude();
                var lng = geoplugin_longitude();
                scope.actualCity = geoplugin_city();
                scope.actualCountry = geoplugin_countryName();

                var map = new google.maps.Map(document.getElementById('map_canvas'), {
                    zoom: 7,
                    center: new google.maps.LatLng(lat, lng),
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                });

                var myMarker = new google.maps.Marker({
                    position: new google.maps.LatLng(lat, lng),
                    draggable: true
                });

                google.maps.event.addListener(myMarker, 'dragend', function (evt) {
                    //document.getElementById('current').innerHTML = '<p>Marker dropped: Current Lat: ' + evt.latLng.lat().toFixed(3) + ' Current Lng: ' + evt.latLng.lng().toFixed(3) + '</p>';
                    GeolocationService.markerPosition(evt.latLng.lat().toFixed(3), evt.latLng.lng().toFixed(3));
                });

                // google.maps.event.addListener(myMarker, 'dragstart', function (evt) {
                //     document.getElementById('current').innerHTML = '<p>Currently dragging marker...</p>';
                // });

                map.setCenter(myMarker.position);
                myMarker.setMap(map);
            }
        };
        return directive;
    }

})();
