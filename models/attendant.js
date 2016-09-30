var db = require('../db');

var attendantSchema = new db.Schema({
  name: {
    type: String,
    unique: false,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  }
});

module.exports = db.model('Attendant', attendantSchema);
