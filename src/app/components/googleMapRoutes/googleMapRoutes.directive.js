(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMapRoutes', ceGoogleMapRoutes);

    ceGoogleMapRoutes.$inject = ['GeolocationService', '$localStorage', 'cacheService'];

    function ceGoogleMapRoutes(GeolocationService, $localStorage, cacheService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMapRoutes/googleMapRoutes.html',
            scope: {
                favchanged: '='
            },
            link: linkFunc
        };
        return directive;

        function linkFunc(scope){

            scope.$watch('favchanged', initMap, true);

            function initMap() {
                GeolocationService.actualPosition()
                .then(function(actualPos){
                    var pointA = new google.maps.LatLng(actualPos.latitude, actualPos.longitude),

                        myOptions = {
                            zoom: 18,
                            center: pointA
                        },

                        map = new google.maps.Map(document.getElementById("map_favorite"), myOptions),
                        directionsService = new google.maps.DirectionsService,
                        directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                        });

                    return [directionsService, directionsDisplay, pointA];
                }).then(function(result){
                    calculateAndDisplayRoute(result[0],result[1],result[2]);

                    document.getElementById('mode').addEventListener('change', function() {
                        calculateAndDisplayRoute(result[0],result[1],result[2]);
                    });
                });

                function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA) {
                    var selectedMode = document.getElementById('mode').value;
                    var approvedToShow = [],
                        endLocation, PointB,
                        waypoints = [];

                    cacheService.excursion.forEach(function(element){
                        if(element.showOnMap) {
                            approvedToShow.push(element);
                        }
                    });

                    endLocation = approvedToShow[approvedToShow.length-1];

                    if (endLocation) {
                        PointB = new google.maps.LatLng(endLocation.location.latitude, endLocation.location.longitude)
                    } else {
                        PointB = ''
                    }

                    approvedToShow.forEach(function(element) {
                        waypoints.push({
                            location: new google.maps.LatLng(element.location.latitude, element.location.longitude)
                        });
                    });

                    waypoints.pop();

                    directionsService.route({
                        origin: pointA,
                        destination: PointB,
                        waypoints: waypoints,
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
    }

})();

