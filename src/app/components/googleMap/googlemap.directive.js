(function() {
    'use strict';

    angular
        .module('project')
        .directive('ceGoogleMap', ceGoogleMap);

    ceGoogleMap.$inject = [];

    function ceGoogleMap() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/googleMap/googleMap.html',
            scope: {
                position: '=',
                name: '@'
            },
            link: function(scope){

                scope.$watch('position', initMap, true);

                function initMap(position) {
                    var mapDiv = document.getElementById('map'),
                        map = new google.maps.Map(mapDiv, {
                        center: new google.maps.LatLng(position.lat,position.lng),
                        zoom: 18
                        }),
                        marker = new google.maps.Marker({
                        position: new google.maps.LatLng(position.lat,position.lng),
                        map: map,
                        title: scope.name
                        });
                }
            }
        };
        return directive;
    }

})();
