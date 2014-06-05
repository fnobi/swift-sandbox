var http = require('http');
var config = require('config');

var app = require(__dirname + '/app');


// create server
var server = http.createServer(app);

// listen
server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});
