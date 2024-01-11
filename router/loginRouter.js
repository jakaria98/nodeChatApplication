const router = require('express').Router();

const loginController = require('../controller/loginController');

router.get('/', loginController);
module.exports = router;
