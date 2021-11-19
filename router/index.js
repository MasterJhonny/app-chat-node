const express = require('express');

const messageRouter = require('./router.message');
const userRouter = require('./router.user');
const chatRouter = require('./router.chat');

function routerApi(app){
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/messages', messageRouter);
  router.use('/users', userRouter);
  router.use('/chats', chatRouter);
}

module.exports = routerApi;
