var http = require('http');

var TestApp = function (app) {
    this.app = app;
};

TestApp.prototype.request = function (opts, callback) {
    opts = opts || {};
    callback = callback || function () {};

    var request = {
        method: opts.method || 'GET',
        url: opts.path || '/',
        headers: opts.headers || {}
    };

    var stack = [],
        res = {};

    var serverResponse = new http.ServerResponse(request);

    serverResponse.writeHead = function (statusCode, headers) {
        res.statusCode = statusCode || res.statusCode;
        http.ServerResponse.prototype.writeHead.apply(this, arguments);
    };
    serverResponse.write = function (data) {
        http.ServerResponse.prototype.write.apply(this, arguments);

        stack.push(data);
    };
    serverResponse.end = function (data) {
        http.ServerResponse.prototype.end.apply(this, arguments);

        if (data) {
            // stack.push(data);
        }
        callback(null, res, stack.join('\n'));
    };

    this.app(request, serverResponse);
};

module.exports = TestApp;