const express = require('express');
const userControllers = require('../controllers/user');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/activate', userControllers.activateAccount);
router.post('/login', userControllers.login);
router.get('/auth', auth.authUser, (req, res) => {
  res.send('hello world');
});
module.exports = router;
