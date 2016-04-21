/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('project')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('categories', [
        'museum',
        'bar',
        'cafe',
        'club',
        'hotel',
        'restaurant'
    ]);

})();
