var assert = require('chai').assert,
    TestApp = require(__dirname + '/../lib/test/TestApp');

describe('app', function () {
    var app = new TestApp(require(__dirname + '/../app'));

    it('get /', function (done) {
        app.request({ path: '/' }, function (err, res, body) {
            assert.equal(res.statusCode, '200');
            assert(body);
            done();
        });
    });
});
