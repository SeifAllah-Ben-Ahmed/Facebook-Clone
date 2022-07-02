const express = require('express');
const uploadControllers = require('../controllers/upload');
const imageUpload = require('../middlewares/imageUpload');
// const { authUser } = require('../middlewares/auth');

const router = express.Router();

// router.use(authUser);
router.post('/uploadImages', imageUpload, uploadControllers.uploadImages);

module.exports = router;
