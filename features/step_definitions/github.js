var { defineSupportCode } = require('cucumber');
var Selector       = require('testcafe').Selector;
var Role           = require('testcafe').Role;

defineSupportCode(function ({ Given, When, Then }) {
    var testController = null;

    Given('I am open GitHub page', function () {
        return this.getTestController()
            .then(function (tc) {
                testController = tc;

                return testController.navigateTo('https://github.com/');
            });
    });

    When('I am typing my search request {stringInDoubleQuotes} on GitHub', function (text) {
        var input = Selector('input.form-control.header-search-input.js-site-search-focus').with({ boundTestRun: testController });

        return testController.typeText(input, text);
    });

    Then('I am pressing {stringInDoubleQuotes} key on GitHub', function (text) {
        return testController.pressKey(text);
    });

    Then('I should see that the first GitHub\'s result is {stringInDoubleQuotes}', function (text) {
        var firstLink = Selector('#js-pjax-container > div.container > div > div.column.three-fourths.codesearch-results.pr-6 > ul > div:nth-child(1) > div.col-8.pr-3 > h3 > a').with({ boundTestRun: testController });

        return testController.expect(firstLink.innerText).contains(text);
    });

    const gitHubRoleForExample = Role('http://github.com/login', function (t) {
        return t
            .click('.btn.btn-primary.btn-block')
            .expect(Selector('#js-flash-container > div > div').innerText).contains("Incorrect username or password.");
    });

    Then('I am trying to use {Role}', function (text) {
        return testController.useRole(gitHubRoleForExample);
    });
});