var request = require('request');

module.exports = function(req, res) {
 console.log(req);
 request.post(
    'http://localhost:1338/v1/challenges/create',
    {},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.redirect("/"); 
      }
    }
  ); 
}
