const express = require('express');

const auth = require('../controllers/auth');

const router = express.Router();

router.get('/create-or-update-user', auth.createOrUpdateUser);

module.exports = router;
