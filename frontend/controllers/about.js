module.exports = function(req, res) {
  res.render(
    "static/about", {
    metaData: req.metaData,
    message: ""
  });
}
