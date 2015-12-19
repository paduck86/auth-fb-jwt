var express = require('express');
var router = express.Router();

var userController = require('../controllers/user');

// Create endpoint handlers for /users
router.route('/')
  .post(userController.postUsers)
  .get(userController.getUsers);

module.exports = router;