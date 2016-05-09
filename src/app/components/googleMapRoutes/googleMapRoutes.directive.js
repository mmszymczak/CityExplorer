(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMapRoutes', ceGoogleMapRoutes);

    ceGoogleMapRoutes.$inject = ['GeolocationService', '$localStorage'];

    function ceGoogleMapRoutes(GeolocationService, $localStorage) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMap/googlemap.html',
            link: linkFunc
        };
        return directive;

    // execute linkFunc, when $localStorage is changed? idk
        // function init(scope) {
        //     scope.$watch(function () { return $localStorage.items; },function(newVal,oldVal){
        //        if(oldVal!==newVal && newVal === undefined){
        //       }
        //     })
        // }

        function linkFunc(scope){

            scope.$watch(function(){
                return $localStorage.items;
            }, function(state){
                console.log(state);
            });

            initMap();

            function initMap() {
                GeolocationService.actualPosition()
                .then(function(actualPos){
                    var pointA = new google.maps.LatLng(actualPos.latitude, actualPos.longitude),

                        myOptions = {
                            zoom: 18,
                            center: pointA
                        },

                        map = new google.maps.Map(document.getElementById("map"), myOptions),
                        directionsService = new google.maps.DirectionsService,
                        directionsDisplay = new google.maps.DirectionsRenderer({
                            map: map
                        });

                    return [directionsService, directionsDisplay, pointA];
                }).then(function(result){
                    calculateAndDisplayRoute(result[0],result[1],result[2],result[3]);

                    document.getElementById('mode').addEventListener('change', function() {
                        calculateAndDisplayRoute(result[0],result[1],result[2],result[3]);
                    });
                });

                function calculateAndDisplayRoute(directionsService, directionsDisplay, pointA) {
                    var destinationsID = $localStorage.clicked,
                        destinationPlaces = $localStorage.items,
                        destinationForWaypoints = [],
                        endLocation, PointB,
                        waypoints = [];

                    destinationPlaces.forEach(function(element,index) {
                        if (destinationsID.includes(element.id)) {
                            destinationForWaypoints.push(destinationPlaces[index]);
                        }
                    });

                    endLocation = destinationForWaypoints[destinationForWaypoints.length-1];

                    if (endLocation) {
                        PointB = endLocation.location.latitude + " " + endLocation.location.longitude;
                    } else {
                        PointB = ''
                    }

                    destinationForWaypoints.forEach(function(element,index) {
                        waypoints.push({
                            location: element.location.latitude + " " + element.location.longitude
                        });
                    });

                    waypoints.pop();

                    var selectedMode = document.getElementById('mode').value;

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

