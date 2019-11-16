var controllers = require(__dirname + "/../controllers")
var mw = require(__dirname + "/../middleware")
var passport = require('passport');

module.exports = function(app) {
  var publicRoutes = [
    "/",
    "/login",
    "/reset/*",
    "/reset",
    "/healthcheck",
    "/signup",
    "/about",
    "/challenges/search",
    "/discover"
  ];

  app.all("/*", mw.checkSessions(publicRoutes));

  app.route("/")
    .get(controllers.home);

  app.route("/about")
    .get(controllers.about);

  app.route("/discover")
    .get(controllers.discover);

  app.route("/challenges/new")
    .get(controllers.challenges.new)
    .post(controllers.challenges.create);

  app.route("/signup")
    .get(controllers.signup)
    .post(controllers.signupCreate);

  app.route("/login")
    .get(controllers.login)
    .post(passport.authenticate('local', {
      successRedirect: '/',
      failureRedirect: '/login',
      failureFlash: true,
      successFlash: 'success'
    }));

}
