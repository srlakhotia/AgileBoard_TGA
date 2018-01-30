const Mongoose = require('mongoose');

const PresidentSchema = Mongoose.Schema({
  name: {type: String},
  party: {type: String},
  term: {type: String}
});

const President = Mongoose.model('President', PresidentSchema);

module.exports = President;