const mongoose = require('mongoose');
const {Schema, model} = mongoose;
const ObjectId = Schema.Types.ObjectId

const User = new Schema({
  username: {type:String, unique: true, required: true},
  password: {type:String, required: true},
  firstName: {type:String, required: true},
  lastName: {type:String, required: true},
  isActive: {type:Boolean, default: true},
  email: String,
  notes: [{type: ObjectId, ref: 'notes'}],
  roles: [{type: ObjectId, ref: 'roles'}]
})

module.exports = model('users', User);