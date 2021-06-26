const express = require('express');
const { signup } = require('../controller/siteController');
const router = express.Router();
const payController = require('../controller/payController');

router.get('/cnow/:id', payController.pay);
router.get('/success', payController.success);
router.get('/cancel', payController.cancel);
router.get('/save', payController.save);

module.exports = router;
