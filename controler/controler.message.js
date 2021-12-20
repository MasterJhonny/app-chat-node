const moment = require('moment');
const boom = require('@hapi/boom');
const config = require('../config');
const socket = require('../socket').socket;
const { ModelMessage } = require('../db/models');

class MessageControler {
  constructor() {
    this.messages = new Array();

  }

  async addMessage (data, file) {
    if(!data) throw new Error('Ups sucedio un error');
    let fileUrl = '';
    if(file){
      fileUrl = `http://${config.host}:${config.port}/app/files/${file.filename}`;
    }
    const fullMessage = {
      ...data,
      file: fileUrl,
      date: moment().format('YYYY-MM-DD HH:mm:ss')
    }
    const myMessage = new ModelMessage(fullMessage);
    const fana = await myMessage.save();
    const msgEmit = await this.getMessage(fana._id)
    socket.io.emit('message', msgEmit);
    return fullMessage;
  }

  async listMessages (optionsFilter) {
    const message = await ModelMessage.find(optionsFilter).populate('user').exec();
    if(!message){
      throw boom.notFound('Ups, not found');
    }
    return message;
  }

  async getMessage (id) {
    const message = await ModelMessage.findById(id).populate('user').exec();
    if(!message){
      throw boom.notFound('Ups, not found');
    }
    return message;
  }

  async updateMessage (id, changes) {
    if(!id || !changes) {
      throw boom.badRequest('Invalid data');
    }
    const updateMessage = await ModelMessage.findById(id);
    if(!updateMessage) {
      throw boom.notFound('Ups, not found');
    }
    updateMessage.message = changes.message;
    updateMessage.save();
    return updateMessage;
  }

  async deleteMessage (id) {
    if(!id) {
      throw boom.badRequest('Invalid data');
    }
    const deleteMessage = await ModelMessage.findByIdAndDelete(id);
    console.log(deleteMessage, '<=')
    if(!deleteMessage){
      throw boom.notFound('Not found');
    }
    return {
      delete: true,
    }
  }
}

module.exports = MessageControler;
