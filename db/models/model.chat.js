const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaChats = new Schema({
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'users',
  }]
});

module.exports = schemaChats;
