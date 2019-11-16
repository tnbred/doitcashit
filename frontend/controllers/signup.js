module.exports = function(req, res) {
  res.render(
    "static/signup", {
    metaData: req.metaData,
    message: req.flash('error')
  });
}
