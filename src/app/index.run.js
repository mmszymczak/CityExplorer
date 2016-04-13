(function() {
    'use strict';

    angular
        .module('project')
        .run(runBlock);

    runBlock.$inject = ['$log', 'FaceService', 'Geolocation'];

    function runBlock($log, FaceService, Geolocation) {
        FaceService.initFB();
        Geolocation.actualPosition();
        $log.debug('runBlock end');
    }

})();
