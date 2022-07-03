const express = require('express');
const uploadControllers = require('../controllers/upload');
const imageUpload = require('../middlewares/imageUpload');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/uploadImages',
  authUser,
  imageUpload,
  uploadControllers.uploadImages
);

module.exports = router;
