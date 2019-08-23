const eat = require('../models/see');

module.exports = function(app) {
  app.get('/api/see/top_posts', (req, res) => {
    eat.selectTopPostsSee(function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  })
}