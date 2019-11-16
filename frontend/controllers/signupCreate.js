var User = require('doitcashit-lib').DICILib.User;
var request = require('request');

module.exports = function(req, res) {
  console.log(req.body);
  //TODO: add validations!
  request.post(
    'http://localhost:1338/v1/user/signup',
    {email:req.body.password, name:req.body.name, birth_date: req.body.bday, password: req.body.password, password_confirmation: req.body.password2},
    function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(JSON.parse(body));
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
