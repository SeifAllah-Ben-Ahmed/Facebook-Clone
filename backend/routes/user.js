const express = require('express');
const userControllers = require('../controllers/user');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/activate', authUser, userControllers.activateAccount);
router.post('/login', userControllers.login);
router.post('/sendVerification', authUser, userControllers.sendVerification);
router.post('/findUser', userControllers.findUser);

module.exports = router;
