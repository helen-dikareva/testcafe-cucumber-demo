var { BeforeAll, AfterAll } = require('cucumber');
const fs                   = require('fs');
const createTestCafe       = require('testcafe');
const testControllerHolder = require('../support/testControllerHolder');

var testcafe = null;
var DELAY    = 5000;

function createTestFile () {
    fs.writeFileSync('test.js',
        'import testControllerHolder from "./features/support/testControllerHolder.js";\n\n' +

        'fixture("fixture")\n' +

        'test("test", testControllerHolder.capture);');
}

function runTest () {
    var runner = null;

    createTestCafe('localhost', 1337, 1338)
        .then(function (tc) {
            testcafe = tc;
            runner   = tc.createRunner();

            return runner
                .src('./test.js')
                .browsers('chrome -incognito')
                .run()
                .catch(function (error) {
                    console.log(error);
                });
        })
        .then(function (report) {
            console.log(report);
        });
}

BeforeAll(function (callback) {
    createTestFile();
    runTest();

    setTimeout(callback, DELAY);
});

AfterAll(function (callback) {
    testControllerHolder.free();
    fs.unlinkSync('test.js');

    setTimeout(callback, DELAY);
});
