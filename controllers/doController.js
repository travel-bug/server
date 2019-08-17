const doStuff = require('../models/do');

module.exports = function (app) {
    app.get('api/doStuff/top_posts', (req, res) => {
        doStuff.selectTopPostsDo(function (err, result) {
            if (err) {
                console.log(err);
            } else {
                res.status(200).json(result);
            }
        });
    })
}