(function() {
    'use strict';

    angular
        .module('project')
        .factory('firebaseService', firebaseService);

    firebaseService.$inject = ['$firebaseArray', '$q'];

    function firebaseService($firebaseArray, $q) {
        var fireBase = {
            addComment: addComment,
            getPlaceComments: getPlaceComments
        };
        return fireBase;

        function addComment(placeId, obj) {
            var defer = $q.defer();
            var placeRef = new Firebase('https://cityexplorer.firebaseio.com/comments/'+placeId);
            placeRef.push(obj);
            defer.resolve();

            return defer.promise;
        }

        function getPlaceComments(placeId) {
            var defer = $q.defer();
            var commentsArr = [];
            var placeCommentsRef = new Firebase('https://cityexplorer.firebaseio.com/comments/'+placeId);

            commentsArr = $firebaseArray(placeCommentsRef);
            defer.resolve(commentsArr);

            return defer.promise;
        }

    }

})();
