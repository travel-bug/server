const orm = require('../orm');

let place = {
  insertPlace: function(place, callback) {
    let query = {
      table: 'place',
      data: place
    };
    orm.insert(query, callback);
  }
};  

module.exports = place;