var express = require('express');
var router = express.Router();

var add_controller = require('../controllers/add_controller');

router.get('/', add_controller.add);

router.get('/budgetDropdown', add_controller.budgetDropdown);

module.exports = router;