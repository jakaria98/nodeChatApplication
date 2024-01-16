const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const { getUser ,addUser, removeUser} = require('../controller/usersController');
const { avatarUpload } = require('../middlewares/users/avatarUpload');
const {
    addUserValidators,
    addUserValidationHandler,
} = require('../middlewares/users/userValidators');
const { checkLogin, redirectLoggedIn } = require('../middlewares/common/checkLogin');

// get user
router.get('/', decorateHtmlResponse('User'), checkLogin, getUser);

// add user
router.post('/', avatarUpload, addUserValidators, addUserValidationHandler, addUser);

// remove user
router.delete("/:id", removeUser);
module.exports = router;
