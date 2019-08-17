const orm = require('../orm');

let doStuff = {
    selectTopPostsDo: function (callback) {
        let query = {
            table: 'post'
        };
        orm.select(query, callback);
    }
    
}

module.exports = doStuff;