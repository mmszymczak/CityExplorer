/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function() {
    this.EC = protractor.ExpectedConditions;
    this.navbar = element(by.css('.navbar'));
    this.navbarUl = element(by.css('.navbar-collapse'));
    this.h1El = element(by.css('.logout-status-header'));
    this.footer = element(by.css('page-footer'));
    this.categoryCard = element.all(by.css('.card'));
    this.loginForm = element(by.css('.login-form-wrap'));
    this.loginFormInput = element(by.css('.login-form-input'));
    this.loginStatus = element(by.css('.login-status__header'));
    this.navBar = element(by.tagName('ce-nav-bar'));
    this.categoryBtn = this.navBar.element(by.css('.nav-category'));
    this.rangeSlider = element(by.css('.range-slider-wrapper'));
    this.categoriesRepeater = element(by.css('category-wrapper__items')).all(by.repeater('item in categoryVm.categories'));
    this.categoryElement = element.all(by.css('.category-element'));
};

module.exports = new MainPage();
