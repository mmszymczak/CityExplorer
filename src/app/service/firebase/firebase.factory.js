(function() {
    'use strict';

    angular
        .module('project')
        .factory('firebaseService', firebaseService);

    firebaseService.$inject = ['$firebaseArray', '$q', 'firebaseUrl', 'userService'];

    function firebaseService($firebaseArray, $q, firebaseUrl, userService) {
        var fireBase = {
            addComment: addComment,
            getPlaceComments: getPlaceComments,
            addUser: addUser,
            addToFavorite: addToFavorite,
            getFavoritePlaces: getFavoritePlaces,
            removeFavoritePlace: removeFavoritePlace,
            addToTrip: addToTrip,
            getExcursionPlaces: getExcursionPlaces,
            removePlaceFromTrip: removePlaceFromTrip,
            updateTripElement: updateTripElement
        };
        return fireBase;

        function addComment(placeId, obj) {
            var defer = $q.defer();
            var placeRef = new Firebase(firebaseUrl+'comments/'+placeId);

            placeRef.push(obj);
            defer.resolve();

            return defer.promise;
        }

        function getPlaceComments(placeId) {
            var defer = $q.defer();
            var commentsArr = [];
            var placeCommentsRef = new Firebase(firebaseUrl+'comments/'+placeId);

            commentsArr = $firebaseArray(placeCommentsRef);
            defer.resolve(commentsArr);

            return defer.promise;
        }

        function addUser(userObj) {
            var defer = $q.defer();
            var userRef = new Firebase(firebaseUrl+'users/'+userObj.id);

            userRef.update(userObj);
            defer.resolve();

            return defer.promise;
        }

        function addToTrip(item) {
            var defer = $q.defer();
            var userId = userService.user.id;
            var excursionRef = new Firebase(firebaseUrl+'users/'+userId+'/excursion');

            excursionRef.push(item);
            defer.resolve();

            return defer.promise;
        }

        function updateTripElement(place) {
            var defer = $q.defer();
            var userId = userService.user.id;
            var excursionRef = new Firebase(firebaseUrl+'users/'+userId+'/excursion/'+place.fireId);

            excursionRef.update(place);
            defer.resolve();

            return defer.promise;
        }

        function getExcursionPlaces(userObj){
            var defer = $q.defer();
            var excursionArr = [];
            var excursionRef = new Firebase(firebaseUrl+'users/'+userObj.id+'/excursion');

            excursionArr = $firebaseArray(excursionRef);
            defer.resolve(excursionArr);

            return defer.promise;
        }

        function removePlaceFromTrip(userObj, place) {
            var excursionRef = new Firebase(firebaseUrl+'users/'+userObj.id+'/excursion/'+place.$id);
            excursionRef.remove();
        }

        function addToFavorite(item) {
            var defer = $q.defer();
            var userId = userService.user.id;
            var facovritePlacesRef = new Firebase(firebaseUrl+'users/'+userId+'/favorites');

            facovritePlacesRef.push(item);
            defer.resolve();

            return defer.promise;
        }

        function getFavoritePlaces(userObj){
            var defer = $q.defer();
            var favoriteArr = [];
            var facovritePlacesRef = new Firebase(firebaseUrl+'users/'+userObj.id+'/favorites');

            favoriteArr = $firebaseArray(facovritePlacesRef);
            defer.resolve(favoriteArr);

            return defer.promise;
        }

        function removeFavoritePlace(userObj, place) {
            var facovritePlacesRef = new Firebase(firebaseUrl+'users/'+userObj.id+'/favorites/'+place.$id);
            facovritePlacesRef.remove();
        }
    }

})();
