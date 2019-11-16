module.exports = function(req, res) {
  res.render(
    "challenges/new", {
    metaData: req.metaData,
    message: ""
  });
}
