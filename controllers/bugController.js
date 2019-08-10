const db = require("../models");


module.exports = function (app) {

    app.get('/api/test', function (req, res) {
        res.json({
            messge: "success!"
        });


    });

}