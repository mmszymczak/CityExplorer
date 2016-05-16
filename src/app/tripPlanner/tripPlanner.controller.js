(function() {
    'use strict';

    angular
        .module('project')
        .controller('TripPlannerController', TripPlannerController);

    TripPlannerController.$inject = ['FacebookService', 'userService', 'googleMapPositionService', 'cacheService', 'firebaseService'];

    function TripPlannerController(FacebookService, userService, googleMapPositionService, cacheService, firebaseService) {
        var tripVm = this;

        tripVm.excursion = [];
        tripVm.user = userService.user;
        tripVm.removeFromTrip = removeFromTrip;
        tripVm.googleMapApiReady = false;

        tripVm.onDropComplete = onDropComplete;
        tripVm.addToMap = addToMap;

        tripVm.limitToCheck = 9;
        tripVm.checkDisable = checkDisable;

        activate();

        function activate() {
            FacebookService.checkLoginState()
                .then(function(){
                    initGoogleMapApi();
                    getExcursionPlaces();
                });
        }

        function getExcursionPlaces() {
            if(cacheService.excursion.length === 0){
                firebaseService.getExcursionPlaces(userService.user)
                    .then(function(result){
                        tripVm.excursion = result;
                        cacheService.saveTrip(result);
                    });
            } else {
                tripVm.excursion = cacheService.getTrip();
            }
        }

        function initGoogleMapApi() {
            googleMapPositionService.onReady()
            .then(function(){
                tripVm.googleMapApiReady = true;
            });
        }

        function removeFromTrip(item) {
            firebaseService.removePlaceFromTrip(userService.user, item);
        }

        function onDropComplete(index, obj){
            var otherObj = tripVm.excursion[index],
                otherIndex = tripVm.excursion.indexOf(obj);
            tripVm.excursion[index] = obj;
            tripVm.excursion[otherIndex] = otherObj;
        }

        function addToMap(id) {
            tripVm.excursion.forEach(function(element) {
                if(element.id === id && element.trip){
                    if(element.showOnMap){
                        element.showOnMap = false;
                    } else {
                        element.showOnMap = true;
                    }
                    firebaseService.updateTripElement(clearObjBeforeUpdate(element));
                }
            });
        }

        function checkDisable(id){
            var onMap = [];
            tripVm.excursion.forEach(function(element) {
                if(element.showOnMap) { onMap.push(element.id); }
            });
            return tripVm.limitToCheck === onMap.length && !onMap.includes(id);
        }

        function clearObjBeforeUpdate(obj) {
            var cleaned = {
                fireId: obj.$id,
                category: obj.category,
                id: obj.id,
                location: obj.location,
                name: obj.name,
                picture: obj.picture,
                showOnMap: obj.showOnMap || false,
                trip: obj.trip
            };
            return cleaned;
        }

    }

})();
