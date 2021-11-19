const boom = require('@hapi/boom');
const { ModelUser } = require('../db/models');

class UserControler {
  constructor() {
    this.messages = new Array();

  }

  async addUser (data) {
    if(!data) throw new Error('Ups sucedio un error');
    const newUser = new ModelUser(data);
    await newUser.save();
    return newUser;
  }

  async listUsers (optionsFilter) {
    const users = await ModelUser.find(optionsFilter);
    if(!users){
      throw boom.notFound('Ups, not found');
    }
    return users;
  }

  async getUser (id) {
    const user = await ModelUser.findById(id);
    if(!user){
      throw boom.notFound('Ups, not found');
    }
    return user;
  }

  async updateUser (id, changes) {
    if(!id || !changes) {
      throw boom.badRequest('Invalid data');
    }
    let updateUser = await ModelUser.findById(id);
    if(!updateUser) {
      throw boom.notFound('Ups, not found');
    }
    console.log(updateUser, '<=')
    // updateUser = {
    //   ...updateUser,
    //   ...changes
    // }
    updateUser.name = changes.name;
    updateUser.save();
    return updateUser;
  }

  async deleteUser (id) {
    if(!id) {
      throw boom.badRequest('Invalid data');
    }
    const deleteUser = await ModelUser.findByIdAndDelete(id);
    if(!deleteUser){
      throw boom.notFound('Not found');
    }
    return {
      delete: true,
    }
  }
}

module.exports = UserControler;
