var express = require('express');
var router  = express.Router();

var home_controller = require('../controllers/home_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/',isAuthenticated, home_controller.home);

module.exports = router;