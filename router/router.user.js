// import package
const express = require('express');
// import controler user
const controlerUser = require('../controler/controler.user');

// import validate handler and schema
const validateHandler = require('../middlewares/validator.handler');
const { createUsserSchema, updateUserSchema, getUserSchema } = require('../schemas/shcema.user');

const router = express.Router();
const controler = new controlerUser();


router.get('/',
  async (req, res, next) => {
    try {
      const options = req.query;
      console.log(options);
      if(options){
        const filterUser = await controler.listUsers(options);
        res.status(200).json(filterUser);
      } else {
        const listUsers = await controler.listUsers();
        res.status(200).json(listUsers);
      }
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:id',
  validateHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const getUser = await controler.getUser(id);
      res.status(200).json(getUser);
    } catch (error) {
      next(error);
    }
  }
)

router.post('/',
  validateHandler(createUsserSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const newUser = await controler.addUser(data);
      res.status(201).json(newUser);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id',
  validateHandler(getUserSchema, 'params'),
  validateHandler(createUsserSchema, 'body'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const body = req.body;
      const updateUser = await controler.updateUser(id, body);
      res.status(201).json(updateUser);
    } catch (error) {
      next(error);
    }
  }
)

router.delete('/:id',
  validateHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const id = req.params.id;
      const deleteUser = await controler.deleteUser(id);
      res.status(200).json(deleteUser);
    } catch (error) {
      next(error);
    }
  }
)


module.exports = router;
