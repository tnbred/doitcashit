var path = require('path');
var express = require('express');
var config = require(__dirname + "/config");
var routes = require(__dirname + "/routes");
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

routes(app);


var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Started : http://%s:%s', host, port);
});


