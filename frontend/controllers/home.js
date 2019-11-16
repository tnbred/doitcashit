var request = require('request');

module.exports = function(req, res) {
  request.post(
    'http://localhost:1338/v1/challenges/trending',
    {},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var popularChallenges = JSON.parse(body).splice(0,3);
       // console.log(popularChallenges[0]);
        res.render(
          "static/home", {
          metaData: req.metaData,
          challenges: popularChallenges,
          message: ""
        });
      }
    }
  );
}
