const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const profileController = require('../controller/profileController');




router.post('/password', profileController.changepass);
router.get('/password', profileController.password);

module.exports = router;