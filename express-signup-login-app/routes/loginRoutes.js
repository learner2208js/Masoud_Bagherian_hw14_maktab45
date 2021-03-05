const express = require('express');
const {
  sendLoginPage,
  checkUserAvailability,
  respondLogin,
  logoutUser,
  redirectHomePage,
} = require('./../controllers/loginController');
const router = express.Router();

// get request : /login
router.get('/', sendLoginPage);
// post request: /login/check-user
router.post('/check-user', checkUserAvailability, respondLogin);
router.get('/:username', logoutUser, redirectHomePage);

module.exports = router;
