var express = require('express');
var router  = express.Router();

var application_controller = require('../controllers/application_controller');

router.get('/', application_controller.index);

router.post("/", application_controller.chartQuery);

module.exports = router;