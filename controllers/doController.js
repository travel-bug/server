const doStuff = require('../models/doStuff');

module.exports = function (app) {
    app.get('/api/doStuff/top_posts', (req, res) => {
        doStuff.selectTopPostsDo(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(result);
            }
        });
    });

    app.get('api/doStuff/do_search', (req, res) => {
        doStuff.searchDoStuff(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(results);
            }
        });
    })
}