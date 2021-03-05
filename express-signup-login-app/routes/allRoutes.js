const express = require('express');
const { resourceUsage } = require('process');
const { redirectLoginPage } = require('../controllers/indexController');
const loginRouter = require('./loginRoutes');
const singupRouter = require('./singupRoutes');
const profileRouter = require('./profileRoutes');
const usersApiRouter = require('./usersApiRoutes');

const router = express.Router();

// get request : /
router.get('/', redirectLoginPage);
// middleware: /login
router.use('/login', loginRouter);
// middleware: /sing-up
router.use('/sign-up', singupRouter);

router.use('/profile', profileRouter);

router.use('/api/v1/users', usersApiRouter);
module.exports = router;
