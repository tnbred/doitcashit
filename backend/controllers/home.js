module.exports = function(req, res) {
  res.render(
    "static/home", {
      metaData: req.metaData,
      message: ""
  });
}
