const express = require('express');
const reactControllers = require('../controllers/react');
const { authUser } = require('../middlewares/auth');

const router = express.Router();

router.put('/reactPost', authUser, reactControllers.reactPost);
router.get('/getReact/:id', authUser, reactControllers.getReact);

module.exports = router;
