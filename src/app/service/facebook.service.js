(function(){
    'use strict';

    angular
        .module('project')
        .service('FaceService', FaceService);

    FaceService.$inject = ['$window', '$timeout'];

    function FaceService($window, $timeout) {
        var service = {
            initFB: initFB,
            checkLoginState: checkLoginState,
            testAPI: testAPI,
            getPlaces: getPlaces,
            getListOfPlaces: getListOfPlaces
        };

        return service;

        var list = [];

        // service functions to return

        function getListOfPlaces() {
            return list;
        }

        function getPlaces() {
            FB.api('/search?q=&type=place&center=53.4290696,14.5567868&distance=1000', function(response) {
                list = response.data;
                return response.data;
            });
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
