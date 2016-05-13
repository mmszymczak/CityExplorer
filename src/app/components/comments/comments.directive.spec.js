(function(){
    'use strict';

    describe('ce-element-comments directive', function(){
        var scope,
            compile,
            directiveElem,
            controller;

        beforeEach(module('project'));
        beforeEach(inject(function($rootScope, $compile, $controller){
            scope = $rootScope.$new();
            compile = $compile;
            controller = $controller('ElementCommentsController', {
                '$scope': scope
            });

            directiveElem = getCompiledElement();
        }));

        function getCompiledElement() {
            var element = angular.element('<ce-element-comments></ce-element-comments>');
            var compiledElement = compile(element)(scope);
            scope.$digest();
            return compiledElement;
        }

        it('should be defined', function() {
            expect(directiveElem).toBeDefined();
        });

        it('should applied template', function () {
            expect(directiveElem.html()).not.toEqual('');
        });

        it('should have header element', function() {
            var headElem = directiveElem.find('h3');
            expect(headElem).toBeDefined();
            expect(headElem.text()).toEqual('Comments left by users');
        });

        it('should contains form', function() {
            var form = directiveElem.find('form');
            expect(form).toBeDefined();
        });

        it('should have place to display comments', function() {
            var commentsWrap = directiveElem.find('div.comments');
            expect(commentsWrap).toBeDefined();
        });

        xit('should call showComments aftere click', function() {
            var element = directiveElem.find('div.comments-header-wrap');

            spyOn(controller, 'showComments').and.callThrough();

            element.triggerHandler('click');

            expect(controller.showComments).toHaveBeenCalled();
        });

    });
})();
