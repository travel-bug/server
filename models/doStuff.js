const orm = require('../orm');

let doStuff = {
    selectTopPostsDo: function (callback) {
        let query = {
            table: 'post',
            data: {},
            columns: ['post.post_id', 'post.user_id', 'post.location_id', 'post.pics_id', 'post.category', 'post.content', 'people.username', 'pics.pics_url', 'place.place_name'],
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
            ],
            where: [
                { 'post.category': 'do' }
            ]
        };
        orm.select(query, callback);
    },
    // searchDoStuff: function(callback) {
    //     let query = {
    //         table: 'place',
    //         data: {},
    //         columns: ['place.place_id', 'place.place.name', 'place.location_id', 'place.gps_id', 'place.lat_long'],

    //     }
    // }

}

module.exports = doStuff;