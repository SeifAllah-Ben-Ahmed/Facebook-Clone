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
router.put('/addFriend/:id', authUser, userControllers.addFriend);
router.put('/cancelRequest/:id', authUser, userControllers.cancelRequest);
router.put('/follow/:id', authUser, userControllers.follow);
router.put('/unfollow/:id', authUser, userControllers.unfollow);
router.put('/acceptRequest/:id', authUser, userControllers.acceptRequest);
router.put('/unfriend/:id', authUser, userControllers.unfriend);
router.put('/deleteRequest/:id', authUser, userControllers.deleteRequest);

module.exports = router;
