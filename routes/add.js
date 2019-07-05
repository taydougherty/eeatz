var express = require('express');
var router  = express.Router();

var add_controller = require('../controllers/add_controller');

router.get('/', add_controller.add);

module.exports = router;