const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schemaMessages = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  message: {
    type: String,
    required: true,
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: 'chats',
  },
  destUserId: String,
  fileUrl: String,
  date: Date,
});

module.exports = schemaMessages;
