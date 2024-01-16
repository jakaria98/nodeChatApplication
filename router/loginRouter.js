const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');
const { getLogin, login, logout } = require('../controller/loginController');
const { loginValidators, loginValidatorsHandler } = require('../middlewares/login/loginValidators');

router.get('/', decorateHtmlResponse('Login'), getLogin);
router.post('/', decorateHtmlResponse('Login'), loginValidators, loginValidatorsHandler, login);
router.delete('/', logout);
module.exports = router;
