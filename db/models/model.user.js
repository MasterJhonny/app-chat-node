const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaUsers = new Schema({
  name: String,
});

module.exports = schemaUsers;
