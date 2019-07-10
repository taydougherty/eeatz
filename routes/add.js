var express = require('express');
var router = express.Router();

var add_controller = require('../controllers/add_controller');
var isAuthenticated = require("../config/middleware/isAuthenticated");

router.get('/',isAuthenticated, add_controller.index);

router.get('/budgetDropdown', add_controller.budgetDropdown);

module.exports = router;