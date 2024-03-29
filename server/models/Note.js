const mongoose = require('mongoose');
const {Schema} = mongoose;
const ObjectId = Schema.Types.ObjectId

const Notes = new Schema({
  title: String,
  body: String,
  user: {type: ObjectId, ref: 'users'}
})

module.exports = mongoose.model('notes', Notes);