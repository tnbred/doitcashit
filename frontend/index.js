var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var expressHandlebars  = require('express-handlebars');
var config = require(__dirname + "/config");
var routes = require(__dirname + "/routes");
var mw = require(__dirname + "/middleware");
var passport = require('passport');
var flash = require('connect-flash');
var app = express();

app.engine("handlebars", expressHandlebars({
  defaultLayout : "main",
  helpers       : require(__dirname + "/presenters/index.js")
}));

app.set("view engine", "handlebars");

app.use(cookieParser(config.Cookie.Secret));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'views/public')));
app.use(cookieSession({ keys: [config.Session.Secret], cookie: { maxAge: null }}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
routes(app);

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});
passport.use(mw.passport);

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Started : http://%s:%s', host, port);
});
