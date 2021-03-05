const express = require('express');
const {
  sendSignupPage,
  validateSignup,
  respondSignup,
} = require('../controllers/singupContrller');
const router = express.Router();

router.get('/', sendSignupPage);
// post request: /sign-up/check-user
router.post('/check-user', validateSignup, respondSignup);

module.exports = router;
