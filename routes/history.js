var express = require('express');
var router  = express.Router();

var history_controller = require('../controllers/history_controller');

router.get('/', history_controller.history);

module.exports = router;