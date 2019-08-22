const post = require('../models/post');
const pics = require('../models/pics');
const place = require('../models/place');

module.exports = function(app) {
  app.post('/api/new_post', (req, res) => {
    pics.insertPicture(/* params */ (err, result) => {
      if (err) {
        console.log(err);
        res.status(503).json({
          message: 'error'
        });
      } else {
        place.insertPlace(/* params */ (err, result) => {
          if (err) {
            console.log(err);
            res.status(503).json({
              message: 'error'
            });
          } else {
            post.insertNewPost(/* params */ (err, result) => {
              if (err) {
                console.log(err);
                res.status(503).json({
                  message: 'error'
                });
              } else {
                res.status(200).json(result);
              }
            });
          }
        });
      }
    });
  });
}