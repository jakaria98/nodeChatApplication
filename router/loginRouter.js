const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { getLogin, login, logout } = require('../controller/loginController');
const { loginValidators, loginValidatorsHandler } = require('../middlewares/login/loginValidators');
const { redirectLoggedIn } = require('../middlewares/common/checkLogin');

router.get('/', decorateHtmlResponse('Login'), redirectLoggedIn, getLogin);
router.post('/', decorateHtmlResponse('Login'), loginValidators, loginValidatorsHandler, login);
router.delete('/', logout);
module.exports = router;
