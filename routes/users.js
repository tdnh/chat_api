var express = require('express');
var router = express.Router();
var UserController = require('../controllers')['UserController'];


router.get('/:id', UserController.detail);

router.post('/login', UserController.login);

router.post('/', UserController.create);

module.exports = router;
