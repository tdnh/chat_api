var express = require('express');
var router = express.Router();
var MessageController = require('../controllers')['MessageController'];


// router.get('/:id', MessageController.detail);

// router.post('/login', MessageController.login);

router.post('/', MessageController.create);

router.get('/rooms/:id/messages', MessageController.getMessageInRoom);

module.exports = router;
