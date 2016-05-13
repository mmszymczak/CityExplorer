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
            addToFavorite: addToFavorite
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

        function addToFavorite(item) {
            var defer = $q.defer();
            var userId = userService.user.id;
            var userRef = new Firebase(firebaseUrl+'users/'+userId+'/favorites');

            userRef.push(item);
            defer.resolve();

            return defer.promise;
        }

    }

})();
