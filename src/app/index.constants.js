(function() {
  'use strict';

  angular
    .module('project')
    .constant('categories', ['museum', 'bar', 'cafe', 'club', 'hotel', 'restaurant'])
    .constant('firebaseUrl', 'https://cityexplorer.firebaseio.com/');

})();
