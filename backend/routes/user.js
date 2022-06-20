const express = require("express");
const userControllers = require("../controllers/user");

const router = express.Router();

router.get("/", userControllers.home);
module.exports = router;
