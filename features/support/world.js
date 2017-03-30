var { defineSupportCode } = require('cucumber');
const testControllerHolder = require('./testControllerHolder');

function CustomWorld () {
    this.getTestController = testControllerHolder.get;
}

defineSupportCode(function ({ setWorldConstructor }) {
    setWorldConstructor(CustomWorld)
});