(function(){
    'use strict';

    angular
        .module('project')
        .factory('errorHandling', errorHandling);

    errorHandling.$inject = ['toastr'];

    function errorHandling(toastr) {
        var catcher = {
            errorFunc: errorFunc,
            infoFunc: infoFunc,
            warnFunc: warnFunc,
            successFunc: successFunc
        };
        return catcher;

        function errorFunc(msg) {
            toastr.error(msg, "Error occurred!");
        }

        function infoFunc(msg) {
            toastr.info(msg, "Information");
        }

        function warnFunc(msg) {
            toastr.warning(msg, "Warning");
        }

        function successFunc(msg) {
            toastr.success(msg, "Success");
        }
    }


})();

