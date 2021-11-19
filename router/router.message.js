// import package npm
const express = require('express');
const multer = require('multer');

const controlerMessage = require('../controler/controler.message');

const router = express.Router();
const controler = new controlerMessage();

//instance of multer
const upload = multer({
  dest: 'public/'
})

router.get('/', async (req, res, next) => {
  try {
    const options = req.query;
    console.log(options);
    if(options){
      const filterMesages = await controler.listMessages(options);
      res.status(200).json(filterMesages);
    } else {
      const listMessages = await controler.listMessages();
      res.status(200).json(listMessages);
    }
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const getMessage = await controler.getMessage(id);
    res.status(200).json(getMessage);
  } catch (error) {
    next(error);
  }
})

router.post('/',
  upload.single('file'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const addMessage = await controler.addMessage(data);
      res.status(201).json(addMessage);
    } catch (error) {
      next(error);
    }
  }
)

router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const updateMessage = await controler.updateMessage(id, body);
    res.status(201).json(updateMessage);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleteMessage = await controler.deleteMessage(id);
    res.status(200).json(deleteMessage);
  } catch (error) {
    next(error);
  }
})


module.exports = router;
