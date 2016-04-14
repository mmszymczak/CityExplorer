(function(){
    'use strict';

    angular
        .module('project')
        .service('FaceService', FaceService);

    FaceService.$inject = ['$window', '$timeout', 'Geolocation'];

    function FaceService($window, $timeout, Geolocation) {
        var service = {
            initFB: initFB,
            checkLoginState: checkLoginState,
            getMuseums: getMuseums,
            getBars: getBars,
            getCafes: getCafes,
            getClubs: getClubs,
            getHotels: getHotels,
            getRestaurants: getRestaurants,
            getDetails: getDetails
        };

        return service;


        // service functions to return

        function getDetails(id, callback) {

            FB.api(
                '/'+id,
                'GET',
                {"fields":["name","price_range","engagement",
                "restaurant_specialties","restaurant_services",
                "website","payment_options","phone","about",
                "category", "description", "food_styles",
                "general_info","location","link"]},
                callback
            );
        }

        function getMuseums(callback) {
            FB.api(
                '/search',
                'GET',
                {"q":"muzeum",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
            FB.api(
                '/search',
                'GET',
                {"q":"art gallery",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name","location","picture.type(large)"]},
                callback
            );
        }

        function getBars(callback) {
            FB.api(
                '/search',
                'GET',
                {"q":"bar",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
        }

        function getCafes(callback) {
            FB.api(
                '/search',
                'GET',
                {"q":"cafe",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
        }

        function getClubs(callback){
            FB.api(
                '/search',
                'GET',
                {"q":"club",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
        }

        function getHotels(callback){
            FB.api(
                '/search',
                'GET',
                {"q":"hotel",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
        }

        function getRestaurants(callback){
            FB.api(
                '/search',
                'GET',
                {"q":"restaurant",
                "type":"place",
                "center": Geolocation.position.latitude+","+Geolocation.position.longitude ,
                "distance":"500",
                "fields":["hours","category","name", "location", "picture.type(large)"]},
                callback
            );
        }

        function testAPI() {
            FB.api('/me/', function(response) {
                console.log('Successful login for: ' + response.name);
                document.getElementById('status').innerHTML =
                'Thanks for logging in, ' + response.name + '!';
            });
        }

        function statusChangeCallback(response) {
            if (response.status === 'connected') {
                testAPI();
            } else if (response.status === 'not_authorized') {
                document.getElementById('status').innerHTML = 'Please log ' +
                'into this app.';
            } else {
                document.getElementById('status').innerHTML = 'Please log ' +
                'into Facebook.';
            }
        }

        function checkLoginState() {
            FB.getLoginStatus(function(response) {
              statusChangeCallback(response);
            });
        }

        //  init facebook API
        function initFB() {
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
        }
    }

})();
