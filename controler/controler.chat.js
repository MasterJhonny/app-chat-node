const boom = require('@hapi/boom');
const { ModelChat } = require('../db/models');

class ChatControler {
  constructor() {
    this.chats = new Array();

  }

  async addChat (chat) {
    if(!chat) throw new Error('Ups sucedio un error');
    const mychat = new ModelChat(chat);
    await mychat.save();
    return mychat;
  }

  async listChats () {
    const chat = await ModelChat.find().populate('users').exec();
    if(!chat){
      throw boom.notFound('Ups, not found');
    }
    return chat;
  }

  async getChat (id) {
    const chat = await ModelChat.find({ users: id }).populate('users').exec();
    if(!chat){
      throw boom.notFound('Ups, not found');
    }
    return chat;
  }

  async updateChat (id, changes) {
    if(!id || !changes) {
      throw boom.badRequest('Invalid data');
    }
    const updatechat = await ModelChat.findById(id);
    if(!updatechat) {
      throw boom.notFound('Ups, not found');
    }
    updatechat.chat = changes.chat;
    updatechat.save();
    return updatechat;
  }

  async deleteChat (id) {
    if(!id) {
      throw boom.badRequest('Invalid data');
    }
    const deletechat = await ModelChat.findByIdAndDelete(id);
    console.log(deletechat, '<=')
    if(!deletechat){
      throw boom.notFound('Not found');
    }
    return {
      delete: true,
    }
  }
}

module.exports = ChatControler;
