var express = require('express');
var router = express.Router();
var RoomController = require('../controllers')['RoomController'];


router.get('/', RoomController.getLists);

router.get('/:id', RoomController.getLists);

router.post('/', RoomController.create);

router.post('/anonymous', RoomController.createAnonymous);

module.exports = router;
