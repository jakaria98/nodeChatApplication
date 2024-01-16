const router = require('express').Router();

const { getInbox } = require('../controller/inboxController');
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse")
const { checkLogin } = require('../middlewares/common/checkLogin');

router.get('/', decorateHtmlResponse("Inbox"), checkLogin, getInbox);
module.exports = router;
