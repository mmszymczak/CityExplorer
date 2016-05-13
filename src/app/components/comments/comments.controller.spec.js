(function(){
    'use strict';

    describe('ElementCommentsController', function(){
        var scope,
            controller,
            fireBase,
            $q;

        beforeEach(module('project'));
        beforeEach(inject(function($rootScope, _$q_, $controller, _firebaseService_){
            scope = $rootScope.$new();
            controller = $controller('ElementCommentsController', {
                '$scope': scope
            });
            $q = _$q_;
            fireBase = _firebaseService_;
        }));

        it('should init form', function(){
            var comment = {
                text: '',
                rate: 0,
                surname: '',
                name: ''
            };

            controller.initForm();

            expect(controller.comment).toEqual(comment);
        });

        it('should return actual date', function(){
            var d = new Date(),
                year = d.getFullYear(),
                month = d.getMonth() + 1,
                day = d.getDate(),
                fullDate = year+'-'+month+'-'+day;

            spyOn(controller, 'makeDate').and.callThrough();

            var result = controller.makeDate();

            expect(result).toEqual(fullDate);
        });

        it('should change comments flag', function() {
            controller.isComment = true;

            controller.showComments();

            expect(controller.isComment).toBe(false);
        });

        it('should get place comments', function(){
            controller.isComment = false;

            spyOn(fireBase, 'getPlaceComments').and.callFake(function(){
                var defer = $q.defer();
                defer.resolve([{elem: 'yes'}, {content: 'that comment'}]);
                return defer.promise;
            });

            controller.showComments();

            expect(controller.isComment).toBe(true);
        });

    });

})();
