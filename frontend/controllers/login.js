module.exports = function(req, res) {
  res.render(
    "static/login", {
    metaData: req.metaData,
    message: req.flash('error')
  });
}
