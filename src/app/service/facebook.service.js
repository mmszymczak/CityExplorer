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
            getPlaces: getPlaces
        };

        return service;

        // service functions to return

        function getPlaces(callback) {
            FB.api(
                '/search',
                'GET',
                {"q":"","type":"place","center":"53.4291333,14.555872699999998","distance":"1000","fields":"category"},
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
