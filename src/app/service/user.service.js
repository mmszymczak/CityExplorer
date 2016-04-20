(function(){
    'use strict';

    angular
        .module('project')
        .service('userService', userService);

    userService.$inject = [];

    function userService() {
        //  when user logged in whole informations load here
        var user = {
            connected: false,
            picture: '',
            first_name: '',
            last_name: '',
            full_name: '',
            profile_link: ''
        };
        return {user: user};
    }

})();
