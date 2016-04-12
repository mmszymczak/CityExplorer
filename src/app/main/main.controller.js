(function() {
  'use strict';

  angular
    .module('project')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec) {
    var vm = this;

    vm.list = [];

    vm.classAnimation = '';
    vm.checkLoginState = checkLoginState;
    vm.testAPI = testAPI;

    activate();

    function activate() {
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function testAPI() {
        FB.api('/me', function(response) {
          console.log('Successful login for: ' + response.name);
          document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
        });
        
        FB.api('/search?q=&type=place&center=53.4290696,14.5567868&distance=1000', function(response) {

          response.data.forEach(function(idx){
            vm.list.push(idx);
          });console.log(vm.list);
        });
        webDevTec.takeMyArr(vm.list);
      }



    ////////////////////////START //////
    
    function statusChangeCallback(response) {
      console.log(response);

      if (response.status === 'connected') {
        vm.testAPI();
      } else if (response.status === 'not_authorized') {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into this app.';
      } else {
        document.getElementById('status').innerHTML = 'Please log ' +
          'into Facebook.';
      }
    }


    function checkLoginState() { console.log('startsdsfsdf');
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    }

    window.fbAsyncInit = function() {
    FB.init({
      appId      : '1174712949207842',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

    // FB.getLoginStatus(function(response) {
    //   statusChangeCallback(response);
    // });

    };

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

    //////////////////////////////////////////////////  END ///////
    


  }
})();
