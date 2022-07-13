const express = require('express');
const userControllers = require('../controllers/user');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.post('/register', userControllers.register);
router.post('/activate', authUser, userControllers.activateAccount);
router.post('/login', userControllers.login);
router.post('/sendVerification', authUser, userControllers.sendVerification);
router.post('/findUser', userControllers.findUser);
router.post('/sendResetPasswordCode', userControllers.sendResetPasswordCode);
router.post('/validateResetCode', userControllers.validateResetCode);
router.post('/changePassword', userControllers.changePassword);
router.get('/getProfile/:username', authUser, userControllers.getProfile);
router.put(
  '/updateProfilePicture',
  authUser,
  userControllers.updateProfilePicture
);
router.put('/updateCover', authUser, userControllers.updateCover);
router.put('/updateDetails', authUser, userControllers.updateDetails);

module.exports = router;
