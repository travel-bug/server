const orm = require('../orm');

let pics = {
  insertPicture: function(pic, callback) {
    let query = {
      table: 'pics',
      data: pic
    };
    orm.insert(query, callback);
  },

  updateProfPic: function(pic, callback) {
    let query = {
      table: 'pics',
      data: { 'pic_type': 'old_prof' },
      where: [
        {
          'pics.person_id': pic.person_id
        },
        {
          'pics.pic_type': 'prof'
        }
      ]
    };
    orm.update(query, callback);
  },

  setNewProfPic: function(pic, callback) {
    let query = {
      table: 'pics',
      data: pic
    };
    orm.insert(query, callback);
  }
}

module.exports = pics;