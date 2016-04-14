(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementInfoController', ElementInfoController);

    ElementInfoController.$inject = ['cacheService', '$routeParams', 'FaceService'];

    function ElementInfoController(cacheService, $routeParams, FaceService) {
        var vm = this;

        vm.elemInfo = [];

        FaceService.getDetails($routeParams.element, function(response){
            console.log(response)
            vm.elemInfo = response;
        });

        function initMap() {
            var mapDiv = document.getElementById('map');
            var map = new google.maps.Map(mapDiv, {
              center: {lat: 44.540, lng: -78.546},
              zoom: 8
            });
        }

    }

})();
