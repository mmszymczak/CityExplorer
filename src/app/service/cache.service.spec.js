(function() {
  'use strict';

    describe('cacheService', function(){
        var cacheService;

        beforeEach(module('project'));
        beforeEach(inject(function(_cacheService_) {
          cacheService = _cacheService_;
        }));

        it('cache service object should be defined', function() {
            expect(cacheService.list).toBeDefined();
        });

        it('should build scaffolding ', function() {
            var scaffold = {
                museum: [],
                bar: [],
                cafe: [],
                club: [],
                hotel: [],
                restaurant: []
            };

            expect(cacheService.list).toEqual(scaffold);
        });

        it('should return cached list', function() {
            var cached = cacheService.getCache();

            expect(cached).toEqual(jasmine.any(Object));
        });

        it('should have been called with two proper parameters', function(){
            var category = 'museum',
                list = ['123', '456', '789'];

            spyOn(cacheService, 'saveCache');

            cacheService.saveCache(category, list);

            expect(cacheService.saveCache).toHaveBeenCalledWith(category, list);
            expect(cacheService.saveCache).toHaveBeenCalledWith(jasmine.any(String), jasmine.any(Array));

        });

        it('should fill object with params ', function() {
            var category = 'museum',
                list = ['123', '456', '789'];

            spyOn(cacheService, 'saveCache').and.callThrough();

            cacheService.saveCache(category, list);

            expect(cacheService.list).toEqual(jasmine.objectContaining({
                museum: ['123', '456', '789']
            }));
        });

    });

})();
