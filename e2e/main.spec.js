'use strict';



describe('The main view before login', function () {
    var page;

    beforeAll(function(){
        browser.get('/index.html');
        page = require('./main.po');
    });

    it('should include login status with correct text', function() {
        page.h1El.getText().then(function(text) {
            expect(text).toBe('To get results and see the action you need to log in facebook account');
        });
    });

    it('should list 6 category cards', function () {
        expect(page.categoryCard.count()).toEqual(6);
    });

    it('should no display categories in navbar', function() {
        expect(page.navbarUl.isPresent()).toBe(false);
    });

    it('should display facebook login form', function() {
        expect(page.loginForm.isPresent()).toBe(true);
    });

});

describe('the main view with login status true', function(){
    var page;
    var PASS = 'superbogdan123';

    beforeAll(function(done){
        page = require('./main.po');
        browser.ignoreSynchronization = true;
        browser.wait(page.EC.elementToBeClickable(page.loginFormInput))
        .then(function () {
            page.loginFormInput.click();

            return browser.getAllWindowHandles()
            .then(function (handles) {

                if (handles.length === 2) {
                    browser.switchTo().window(handles[1]).then(function () {
                        browser.driver.findElement(by.id('email')).sendKeys('bogdandandys@gmail.com');
                        browser.driver.findElement(by.id('pass')).sendKeys(PASS);
                        browser.driver.findElement(by.id('u_0_2')).click();
                        browser.sleep(2000);
                    });
                    return browser.switchTo().window(handles[0]);
                }
            });

        }).then(done);
        browser.ignoreSynchronization = false;
    });

    it('should display login status true with user name', function() {
        page.loginStatus.getText().then(function(text) {
            expect(text).toBe('Thanks for logging in, Bogdan Dandys!');
        });
    });

    it('should display categories in navbar', function() {
        expect(page.navbarUl.isPresent()).toBe(true);
    });

    it('should hide facebook login form', function() {
        expect(page.loginForm.isPresent()).toBe(false);
    });

    describe('categories page', function() {
        var page;

        beforeAll(function() {
            page = require('./main.po');
            browser.wait(page.EC.visibilityOf(page.categoryBtn), 3000);

            page.categoryBtn.click();
        });

        it('should show input range to change the search area', function() {
            page.rangeSlider.element(by.tagName('h1')).getText().then(function(text){
                expect(text).toBe('Change the search area');
            });
        });

        it('should ng-repeat through 6 categories boxes', function() {
            expect(page.categoryElement.count()).toEqual(6);
        });
    });

});
