'use strict';

describe('The main view', function () {
    var page;

    beforeEach(function () {
        browser.get('/index.html');
        page = require('./main.po');
    });

    xit('should include login status with correct text', function() {
        page.h1El.getText().then(function(text) {
            expect(text).toBe('To get results and see the action you need to log in facebook account');
        });
    });

    xit('should list 6 category cards', function () {
        expect(page.categoryCard.count()).toEqual(6);
    });

    xit('should no display categories in navbar', function() {
        expect(page.navbarUl.isPresent()).toBe(false);
    });

    xit('should display facebook lofin form', function() {
        expect(page.loginForm.isPresent()).toBe(true);
    });

});
