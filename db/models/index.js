const config = require('../../config');

const mongoose = require('mongoose');
const db = require('mongoose');

// inport model docuement database
const schemaMessages = require('./model.message');
const schemaUsers = require('./model.user');
const schemaChats = require('./model.chat');

// create Models
const ModelMessage = mongoose.model('messages', schemaMessages);
const ModelUser = mongoose.model('users', schemaUsers);
const ModelChat = mongoose.model('chats', schemaChats);

const { user, password } = config;

const URI = `mongodb+srv://${user}:${password}@cluster0.i9d9d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

db.Promise = global.Promise;
db.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('ok [data-base]'))
.catch(err => console.error('[data-base]', err))


module.exports = {
  db,
  ModelMessage,
  ModelUser,
  ModelChat
}
