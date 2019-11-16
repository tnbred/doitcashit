var request = require('request');

module.exports = function(req, res) {
  request.post(
    'http://localhost:1338/v1/challenges/trending',
    {},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var challenges = JSON.parse(body);
       // console.log(popularChallenges[0]);
        res.render(
          "static/discover", {
          metaData: req.metaData,
          challenges: challenges,
          message: ""
        });
      }
    }
  );
}
