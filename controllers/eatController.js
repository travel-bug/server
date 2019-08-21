const eat = require('../models/eat');

module.exports = function(app) {
  app.get('/api/eat/top_posts', (req, res) => {
    eat.selectTopPostsEat(function(err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  })
}