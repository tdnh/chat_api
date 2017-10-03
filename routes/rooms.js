var express = require('express');
var router = express.Router();
var RoomController = require('../controllers')['RoomController'];


// router.get('/:id', RoomController.detail);

// router.post('/login', RoomController.login);

router.post('/', RoomController.create);

module.exports = router;
