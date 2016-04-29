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
        elemComVm.resetForm = resetForm;
        elemComVm.submitted=true;
        elemComVm.comment = {
            text: '',
            rate: 0,
            surname: '',
            name: ''
        }


        function resetForm() {
            elemComVm.comment = {
                text: '',
                rate: 0,
                surname: '',
                name: ''
            }
        }

        function makeDate() {
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                fullDate = year+'-'+month+'-'+day;

            return fullDate;
        }

        function sendComment(comment) {
            comment['picture'] = userService.user.picture;
            comment['date'] = makeDate();
            elemComVm.submitted=false;

            firebaseService.addComment(elemComVm.actualPlace, comment);
            resetForm();
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
