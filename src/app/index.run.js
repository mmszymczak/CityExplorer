(function() {
    'use strict';

    angular
        .module('project')
        .run(runBlock);

    runBlock.$inject = ['$log'];

    function runBlock($log) {
        $log.debug('runBlock end');
    }

})();
