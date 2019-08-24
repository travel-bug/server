const post = require('../models/post');
const pics = require('../models/pics');
const place = require('../models/place');

module.exports = function (app) {

  app.get('/api/top_posts', (req, res) => {
    eat.selectTopPosts(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  app.post('/api/new_post', (req, res) => {
    console.log('new post hit');
    let postParams = {
      user_id: req.body.user_id,
      category: req.body.category || 'do',
      content: req.body.content || ''
    };
    let picParams = {
      person_id: req.body.user_id,
      pics_url: req.body.image_url,
      pic_type: 'post'
    };
    pics.insertPicture(picParams, (err, picResult) => {
      if (err) {
        console.log(err);
        res.status(503).json({
          message: 'error'
        });
      } else {
        postParams.pics_id = picResult.insertId;
        let placeParams = {
          place_name: req.body.place_name
        };
        place.insertPlace(placeParams, (err, placeResult) => {
          if (err) {
            console.log(err);
            res.status(503).json({
              message: 'error'
            });
          } else {
            postParams.location_id = placeResult.insertId;
            console.log(postParams);
            post.insertNewPost(postParams, (err, result) => {
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

  app.post('/api/new_prof_pic', (req, res) => {
    let picParams = {
      person_id: req.body.user_id,
      pics_url: req.body.image_url,
      pic_type: 'prof'
    };
    pics.updateProfPic(picParams, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        pics.setNewProfPic(picParams, (err, newResult) => {
          if (err) {
            console.log(err);
          } else {
            res.status(200).json(newResult);
          }
        });
      }
    });
  });
}