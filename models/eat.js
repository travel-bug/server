const orm = require('../orm');

let eat = {
  selectTopPostsEat: function(callback) {
    let query = {
      table: 'post',
      data: {},
      columns: ['post.post_id', 'post.user_id', 'post.location_id', 'post.pics_id', 'people.username', 'pics.pics_url', 'place.place_name'],
      join: [
        {
          table: 'people',
          condition: [
            {
              left: 'post.user_id',
              right: 'people.person_id'
            }
          ]
        },
        {
          table: 'pics',
          condition: [
            {
              left: 'post.pics_id',
              right: 'pics.pics_id'
            }
          ]
        },
        {
          table: 'place',
          condition: [
            {
              left: 'post.location_id',
              right: 'place.place_id'
            }
          ]
        }
      ]
    };
    orm.select(query, callback);
  }
}

module.exports = eat;