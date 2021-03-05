const express = require('express');
const {
  sendUserProfile,
  checkLoginAutherization,
  isUserAuthorized,
  respondUserEditation,
} = require('./../controllers/profileController');
const { validateSignup } = require('./../controllers/singupContrller');
const router = express.Router();

router.get('/:username', checkLoginAutherization, sendUserProfile);
router.post(
  '/check-user',
  isUserAuthorized,
  validateSignup,
  respondUserEditation
);
module.exports = router;
