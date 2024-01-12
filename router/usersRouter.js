const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const { getUser } = require('../controller/usersController');
const { avatarUpload } = require('../middlewares/common/users/avatarUpload');

router.get('/', decorateHtmlResponse('User'), getUser);
router.post('/', avatarUpload);
module.exports = router;
