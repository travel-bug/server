const orm = require('../orm');

let post = {
    selectTopPosts: function (callback) {
        let query = {
            table: 'post',
            data: {},
            columns: ['post.post_id', 'post.user_id', 'post.location_id', 'post.pics_id', 'post.category', 'people.username', 'pics.pics_url', 'place.place_name', 'post.content'],
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
    },
    insertNewPost: function (post, callback) {
        let query = {
            table: 'post',
            data: post
        };
        orm.insert(query, callback);
    }
}

module.exports = post;