const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const Role = new Schema({
  value: {type: String, unique: true, default:"user"}
})

module.exports = model('roles', Role);