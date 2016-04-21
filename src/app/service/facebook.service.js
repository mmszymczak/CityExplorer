(function(){
    'use strict';

    angular
        .module('project')
        .service('FacebookService', FacebookService);

    FacebookService.$inject = ['$window', '$location', '$timeout', 'GeolocationService', '$q', 'userService'];

    function FacebookService($window, $location, $timeout, GeolocationService, $q, userService) {
        var service = {
            checkLoginState: checkLoginState,
            login: login,
            logout: logout,
            getMuseums: getMuseums,
            getBars: getBars,
            getCafes: getCafes,
            getClubs: getClubs,
            getHotels: getHotels,
            getRestaurants: getRestaurants,
            getDetails: getDetails,
            loginResponse: ''
        };

        return service;


        // service functions to return
        function getDetails(id) {
            var deferred = $q.defer();
            FB.api(
                '/'+id,
                'GET',
                {"fields":["name","price_range","engagement",
                "restaurant_specialties","restaurant_services",
                "website","payment_options","phone","about",
                "category", "description", "food_styles",
                "general_info","location","link","picture.type(large)"]},
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            return deferred.promise;
        }

        function getMuseums() {
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"muzeum",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getBars() {
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"bar",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getCafes() {
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"cafe",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getClubs(){
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"club",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getHotels(){
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"hotel",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getRestaurants(){
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                FB.api(
                    '/search',
                    'GET',
                    {"q":"restaurant",
                    "type":"place",
                    "center": position.latitude+","+position.longitude ,
                    "distance":"1000",
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('Error occured');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getUserData() {
            var deferred = $q.defer();
            FB.api(
                '/me',
                'GET',
                {"fields":["name","picture","first_name","last_name","hometown","location","link"]},
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('Error occured');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            deferred.promise.then(function(response){
                service.loginResponse = 'Thanks for logging in, ' + response.name + '!';
                userService.user.first_name = response.first_name;
                userService.user.last_name = response.last_name;
                userService.user.full_name = response.name;
                userService.user.profile_link = response.link;
                userService.user.picture = response.picture.data.url;
            });
        }

        function checkLoginState() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response)
                .then(function(){
                    deferred.resolve();
                });
            });
            return deferred.promise;
        }

        function statusChangeCallback(response) {
            var deferred = $q.defer();
            if (response.status === 'connected') {
                getUserData();
                $timeout(function(){
                    userService.user.connected = true;
                },0);
                deferred.resolve();
            } else {
                $window.location.href = '#/';
            }
            return deferred.promise;
        }

        function login(){
            FB.login(function(response){
                if (response.status === 'connected') {
                    statusChangeCallback(response);
                }
            });
        }

        function logout() {
            FB.logout(function() {
                $timeout(function(){
                    userService.user.connected = false;
                    $window.location.href = '#/';
                },0);
            });
        }

    }

})();
