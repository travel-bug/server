const orm = require('../orm');

let pics = {
  insertPicture: function(pic, callback) {
    let query = {
      table: 'pics',
      data: pic
    };
    orm.insert(query, callback);
  }
}

module.exports = pics;