(function() {
    'use strict';

    angular
        .module('project')
        .run(runBlock);

    runBlock.$inject = ['$log', 'FaceService'];

    function runBlock($log, FaceService) {
        FaceService.initFB();
        $log.debug('runBlock end');
    }

})();
