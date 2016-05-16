(function(){
    'use strict';

    angular
        .module('project')
        .factory('FacebookService', FacebookService);

    FacebookService.$inject = ['$rootScope', '$window', '$location', 'errorHandling', 'firebaseService', '$timeout', 'GeolocationService', '$q', 'userService', 'cacheService'];

    function FacebookService($rootScope, $window, $location, errorHandling, firebaseService, $timeout, GeolocationService, $q, userService, cacheService) {
        var service = {
            checkLoginState: checkLoginState,
            login: login,
            logout: logout,
            setRange: setRange,
            rangeDistance: 500,
            getMuseums: getMuseums,
            getBars: getBars,
            getCafes: getCafes,
            getClubs: getClubs,
            getHotels: getHotels,
            getRestaurants: getRestaurants,
            getDetails: getDetails,
            getComments: getComments,
            getMoreData: getMoreData,
            getUploadedPhotos: getUploadedPhotos,
            loginResponse: ''
        };

        return service;

        function getUploadedPhotos(id) {
            var deferred = $q.defer();
            FB.api(
                '/'+id+'/photos',
                'GET',
                {"type":"uploaded","fields":"id,name,source"},
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('An error occurred while retrieving data');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            return deferred.promise;
        }

        function setRange(range) {
            service.rangeDistance = range;
        }

        function getMoreData(request) {
            var deferred = $q.defer();
            FB.api(request,
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('An error occurred while retrieving data');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            return deferred.promise;
        }

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
                        deferred.reject('An error occurred while retrieving data');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            return deferred.promise;
        }

        function getComments(id) {
            var deferred = $q.defer();
            FB.api(
                '/'+id+'/posts',
                'GET',
                {"limit":"3"},
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('An error occurred while retrieving data');
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
                    "distance": service.rangeDistance,
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('An error occurred while retrieving data');
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
                    "distance": service.rangeDistance,
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('An error occurred while retrieving data');
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
                    "distance": service.rangeDistance,
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('An error occurred while retrieving data');
                        } else {
                            deferred.resolve(response);
                        }
                    }
                );
            });
            return deferred.promise;
        }

        function getClubs(){    /// danceing party
            var queries = ['club', 'disco', 'nightclub', 'dance', 'discotheque', 'party'];
            var fullArray = [];
            var deferred = $q.defer();
            GeolocationService.actualPosition()
            .then(function(position){
                angular.forEach(queries, function(query){
                    FB.api(
                        '/search',
                        'GET', {
                        "q": query,
                        "type":"place",
                        "center": position.latitude+","+position.longitude ,
                        "distance": service.rangeDistance,
                        "fields":["hours","category","name", "location", "picture.type(large)"]
                        },
                        function(response) {
                            if (!response || response.error) {
                                deferred.reject('An error occurred while retrieving data');
                            } else {
                                fullArray.push(response);
                                deferred.resolve(response);
                            }
                        }
                    );
                });
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
                    "distance": service.rangeDistance,
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('An error occurred while retrieving data');
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
                    "distance": service.rangeDistance,
                    "fields":["hours","category","name", "location", "picture.type(large)"]},
                    function(response) {
                        if (!response || response.error) {
                            deferred.reject('An error occurred while retrieving data');
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
                {"fields":["id","name","picture","first_name","last_name","hometown","location","link"]},
                function(response) {
                    if (!response || response.error) {
                        deferred.reject('An error occurred while retrieving data');
                        errorHandling.error('Something goes wrong...');
                    } else {
                        deferred.resolve(response);
                    }
                }
            );
            deferred.promise.then(function(response){
                var user = saveUserData(response);
                service.loginResponse = 'Thanks for logging in, ' + response.name + '!';
                return user;
            }).then(function(userObj){
                firebaseService.addUser(userObj);
                loadUserPlaces(userObj);
            });
            return deferred.promise;
        }

        function loadUserPlaces(userObj) {
            firebaseService.getFavoritePlaces(userObj)
                .then(function(result){
                    cacheService.saveFavorite(result);
                });
            firebaseService.getExcursionPlaces(userObj)
                .then(function(result){
                    cacheService.saveTrip(result);
                });
        }

        function saveUserData(data){
            userService.user.id = data.id;
            userService.user.first_name = data.first_name;
            userService.user.last_name = data.last_name;
            userService.user.full_name = data.name;
            userService.user.profile_link = data.link;
            userService.user.picture = data.picture.data.url;
            userService.user.happy = true;

            return userService.user;
        }

        function checkLoginState() {
            var deferred = $q.defer();
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response)
                .then(function(){
                    deferred.resolve();
                })
                .catch(function(){
                    errorHandling.warnFunc('Please login to continue.');
                    deferred.reject();
                });
            });
            return deferred.promise;
        }

        function statusChangeCallback(response) {
            var deferred = $q.defer();
            if (response.status === 'connected') {
                if(!userService.user.happy){
                    getUserData().then(function(){
                        deferred.resolve();
                    });
                }else{ deferred.resolve(); }

                userService.user.connected = true;
            } else {
                $window.location.href = '#/';
                deferred.reject();
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
                    errorHandling.infoFunc('You have been logged out.');
                },0);
            });
        }

    }

})();
