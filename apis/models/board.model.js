const Mongoose = require('mongoose');

const BoardSchema = Mongoose.Schema({
  title: {type: String, required: true}
});

const Board = Mongoose.model('boards', BoardSchema);

module.exports = Board;