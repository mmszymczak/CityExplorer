(function(){
    'use strict';

    angular
        .module('project')
        .service('FaceService', FaceService);

    FaceService.$inject = ['$window', '$timeout', 'Geolocation', '$q', 'userService'];

    function FaceService($window, $timeout, Geolocation, $q, userService) {
        var service = {
            initFB: initFB,
            loginFB: loginFB,
            logoutFB: logoutFB,
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
            Geolocation.actualPosition()
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
            Geolocation.actualPosition()
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
            Geolocation.actualPosition()
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
            Geolocation.actualPosition()
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
            Geolocation.actualPosition()
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
            Geolocation.actualPosition()
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

        function testAPI() {
            var deferred = $q.defer();
            FB.api(
                '/me',
                'GET',
                {"fields":["name","picture","first_name","last_name","hometown","location","link"]},
                function(response) {
                deferred.resolve(response);
            });
            deferred.promise.then(function(response){
                var loginResponse = 'Thanks for logging in, ' + response.name + '!';
                service.loginResponse = loginResponse;
                userService.user.first_name = response.first_name;
                userService.user.last_name = response.last_name;
                userService.user.full_name = response.name;
                userService.user.profile_link = response.link;
                userService.user.picture = response.picture.data.url;
            });
        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                testAPI();
                $timeout(function(){
                    userService.user.connected = true;
                },0);
            }
        }

        function loginFB(){
            FB.login(function(response){
                if (response.status === 'connected') {
                    statusChangeCallback();
                console.log('Successfully logged in!');
                } else if (response.status === 'not_authorized') {
                console.log('Login response: not_authorized please try again');
                } else {
                console.log('Login response: unknown, log in please');
                }
            });
        }

        function logoutFB() {
            FB.logout(function(response) {
                $timeout(function(){
                    userService.user.connected = false;
                    console.log('Person is now logged out');
                },0);
            });
        }

        //  init facebook API
        function initFB() {
            var deferred = $q.defer();
            $window.fbAsyncInit = function() {
                FB.init({
                    appId: '1174712949207842',
                    cookie: true,  // to allow the server to access the session
                    status: true,
                    xfbml: true,  // parse social plugins on this page
                    version: 'v2.5' // use graph api version 2.5
                });
                //  log in automatic if you have opened fb connection
                FB.getLoginStatus(function(response) {
                    statusChangeCallback(response);
                    deferred.resolve(response.status);
                });
            };

            // Load the SDK asynchronously
            (function(d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s); js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            return deferred.promise;
        }
    }

})();
