const express = require('express');
const { getUser } = require('./../controllers/usersApiController');
const router = express.Router();

router.get('/:username', getUser);

module.exports = router;
