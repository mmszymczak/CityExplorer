(function(){
    'use strict';

    angular
        .module('project')
        .service('userService', userService);

    userService.$inject = [];

    function userService() {
        var user = {
            connected: false
        };
        return user;
    }

})();
