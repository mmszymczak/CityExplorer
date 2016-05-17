/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.navbar = element(by.css('.navbar'));
    this.navbarUl = element(by.css('.navbar-collapse'));
    this.h1El = element(by.css('.logout-status-header'));
    this.footer = element(by.css('page-footer'));
    this.categoryCard = element.all(by.css('.card'));
    this.loginForm = element(by.css('.login-form-wrap'));
    //this.thumbnailEls = element(by.css('card')).all(by.repeater('awesomeThing in main.awesomeThings'));
};

module.exports = new MainPage();
