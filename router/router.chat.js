const express = require('express');
const controlerChat = require('../controler/controler.chat');

const router = express.Router();
const controler = new controlerChat();


router.get('/',
  async (req, res, next) => {
    try {
      const listChats = await controler.listChats();
      res.status(200).json(listChats);
    } catch (error) {
      next(error);
    }
  }
)

router.get('/:userId', async (req, res, next) => {
  try {
    const id = req.params.userId;
    const getChat = await controler.getChat(id);
    res.status(200).json(getChat);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const data = req.body;
    console.log(data, '<==')
    const addChat = await controler.addChat(data);
    res.status(201).json(addChat);
  } catch (error) {
    next(error);
  }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateChat = await controler.updateChat(id, body);
    res.status(201).json(updateChat);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteChat = await controler.deleteChat(id);
    res.status(200).json(deleteChat);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
