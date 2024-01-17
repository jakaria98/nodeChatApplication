const router = require('express').Router();

const decorateHtmlResponse = require('../middlewares/common/decorateHtmlResponse');

const { getUser ,addUser, removeUser} = require('../controller/usersController');
const { avatarUpload } = require('../middlewares/users/avatarUpload');
const {
    addUserValidators,
    addUserValidationHandler,
} = require('../middlewares/users/userValidators');
const { checkLogin, redirectLoggedIn , requireRole} = require('../middlewares/common/checkLogin');

// users page
router.get(
  "/",
  decorateHtmlResponse("Users"),
  checkLogin,
  requireRole(["admin"]),
  getUser
);

// add user
router.post(
  "/",
  checkLogin,
  requireRole(["admin"]),
  avatarUpload,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// remove user
router.delete("/:id", checkLogin, requireRole(["admin"]), removeUser);
module.exports = router;
