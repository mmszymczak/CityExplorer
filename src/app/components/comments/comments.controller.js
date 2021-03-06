(function(){
    'use strict';

    angular
        .module('project')
        .controller('ElementCommentsController', ElementCommentsController);

    ElementCommentsController.$inject = ['userService', '$routeParams', '$scope', 'firebaseService'];

    function ElementCommentsController(userService, $routeParams, $scope, firebaseService) {
        var elemComVm = this;

        elemComVm.actualPlace = $routeParams.element;
        elemComVm.userInfo = userService.user;
        elemComVm.showComments = showComments;
        elemComVm.isComment = false;

        elemComVm.readOnly = true;
        elemComVm.commentRate = 3;
        elemComVm.sendComment = sendComment;
        elemComVm.commentsArray = [];
        elemComVm.initForm = initForm;
        elemComVm.resetForm = resetForm;
        elemComVm.makeDate = makeDate;
        elemComVm.submitted=true;
        elemComVm.readyToUse = true;

        $scope.starRating = 0;
        $scope.click = click;
        $scope.mouseHover = mouseHover;
        $scope.mouseLeave = mouseLeave;

        activate();

        function activate() {
           initForm();
        }

        function resetForm(form) {
            form.$setPristine();
            form.$setUntouched();
        }

        function initForm() {
            elemComVm.comment = {
                text: '',
                rate: 0,
                surname: '',
                name: ''
            };
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
            initForm();
            elemComVm.readyToUse = false;
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

        function click(param) {
            elemComVm.comment.rate = param;
        }

        function mouseHover(param) {
            $scope.hoverRating3 = param;
        }

        function mouseLeave(param) {
            $scope.hoverRating3 = param + '*';
        }

    }

})();
