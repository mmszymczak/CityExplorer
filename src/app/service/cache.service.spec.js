(function() {
  'use strict';

  describe('cacheService', function(){
    var cacheService;
    var categories;

    beforeEach(module('project'));
    beforeEach(inject(function(_cacheService_, _categories_) {
      cacheService = _cacheService_;
      categories = _categories_;
    }));

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

  });

})();
