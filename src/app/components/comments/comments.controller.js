(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementCommentsController', ElementCommentsController);

    ElementCommentsController.$inject = ['userService', '$routeParams', 'firebaseService'];

    function ElementCommentsController(userService, $routeParams, firebaseService) {
        var elemComVm = this;

        elemComVm.actualPlace = $routeParams.element;
        elemComVm.userInfo = userService.user;
        elemComVm.showComments = showComments;
        elemComVm.isComment = false;

        elemComVm.readOnly = true;
        elemComVm.commentRate = 3;
        elemComVm.sendComment = sendComment;
        elemComVm.commentsArray = [];

        elemComVm.parcel = {
            fullname: 'ziutek',
            picture: 'https://scontent.xx.fbcdn.net/hprofile-xft1/v/t1.0-1/p50x50/12688296_1073512766013897_6249594735101307367_n.jpg?oh=c76c4b229088c7cbe83fa6076f2bee5f&oe=57B23B35',
            date: makeDate(),
            comment: 'testowyowy owy komentarzeee',
            stars: 4
        };


        function makeDate() {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth(),
                day = d.getDate(),
                fullDate = day+'-'+month+1+'-'+year;

            return fullDate;
        }

        function sendComment(comment) {
            comment['picture'] = userService.user.picture;
            comment['date'] = makeDate();

            firebaseService.addComment(elemComVm.actualPlace, comment);
        }

        function showComments() {
            if(!elemComVm.isComment){
                firebaseService.getPlaceComments(elemComVm.actualPlace)
                    .then(function(arr){
                        elemComVm.commentsArray = arr;
                    });
                elemComVm.isComment = true;
            }else{
                elemComVm.isComment = false;
            }
        }
    }

})();
