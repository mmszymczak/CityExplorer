(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMap', ceGoogleMap);

    ceGoogleMap.$inject = ['GeolocationService'];

    function ceGoogleMap(GeolocationService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMap/googlemap.html',
            scope: {
                position: '='
            },
            link: function(scope){

                scope.$watch('position', initMap, true);

                function initMap(position) {
                    GeolocationService.actualPosition()
                    .then(function(actualPos){
                        var pointA = new google.maps.LatLng(actualPos.latitude, actualPos.longitude),
                            pointB = new google.maps.LatLng(position.lat,position.lng),

                            myOptions = {
                                zoom: 18,
                                center: pointA
                            },

                            map = new google.maps.Map(document.getElementById("map"), myOptions),
                            directionsService = new google.maps.DirectionsService,
                            directionsDisplay = new google.maps.DirectionsRenderer({
                                map: map
                            });

                        // get route from A to B
                        return [directionsService, directionsDisplay, pointA, pointB];
                    }).then(function(result){
                        calculateAndDisplayRoute(result[0],result[1],result[2],result[3]);

                        document.getElementById('mode').addEventListener('change', function() {
                            calculateAndDisplayRoute(result[0],result[1],result[2],result[3]);
                        });
                    });

                    function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
                        var selectedMode = document.getElementById('mode').value;
                        directionsService.route({
                            origin: pointA,
                            destination: pointB,
                            avoidTolls: true,
                            avoidHighways: false,
                            travelMode: google.maps.TravelMode[selectedMode]
                        }, function (response, status) {
                            if (status == google.maps.DirectionsStatus.OK) {
                                directionsDisplay.setDirections(response);
                            }
                        });
                    }
                }
            }
        };
        return directive;
    }

})();
