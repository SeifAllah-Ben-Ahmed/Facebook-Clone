const express = require('express');
const userControllers = require('../controllers/user');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/activate', userControllers.activateAccount);
router.post('/login', userControllers.login);
module.exports = router;
