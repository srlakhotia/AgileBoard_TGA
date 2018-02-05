const Mongoose = require('mongoose');

const ListSchema = Mongoose.Schema({
  title: {type: String, required: true},
  parentId: {type: Mongoose.SchemaTypes.ObjectId},
  cards: [{
      cardId: {type: Number, required: true},
      title: {type: String, required: true}
  }]
});

const List = Mongoose.model('lists', ListSchema);

module.exports = List;