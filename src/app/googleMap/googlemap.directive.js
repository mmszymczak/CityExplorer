(function() {
    'use strict';

    angular
        .module('project')
        .directive('googleMap', googleMap);

    googleMap.$inject = ['googleMapService'];

    function googleMap(googleMapService) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/googleMap/googleMap.html',
            scope: {
                position: '=',
                name: '@'
            },
            link: function(scope){

                scope.$watch('position', initMap, true);

                function initMap(position) {
                    var mapDiv = document.getElementById('map');
                    var map = new google.maps.Map(mapDiv, {
                        center: new google.maps.LatLng(position.lat,position.lng),
                        zoom: 18
                    });
                    var marker = new google.maps.Marker({
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
