const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const { getUser } = require('../controller/usersController');

router.get('/', decorateHtmlResponse('User'), getUser);
module.exports = router;
