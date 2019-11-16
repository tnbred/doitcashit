var controllers = require(__dirname + "/../controllers")

module.exports = function(app) {

  app.route("/v1/challenges/trending")
  .post(controllers.challenges.trending);

  app.route("/v1/challenges/:id/get")
  .get(controllers.challenges.get);

  app.route("/v1/challenges/list")
  .post(controllers.challenges.list);

  app.route("/v1/challenges/create")
  .post(controllers.challenges.create);

  app.route("/v1/pledges/create")
  .post(controllers.pledges.create);

  app.route("/v1/follows/create")
  .post(controllers.follows.create);

  app.route("/v1/challenges/search")
  .post(controllers.challenges.search);

  app.route("/v1/users/signup")
  .post(controllers.users.signup);

  app.route("/v1/users/login")
  .post(controllers.users.login);

}




