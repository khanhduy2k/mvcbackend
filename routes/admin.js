const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');


router.get('/insert', adminController.insert);
router.post('/insert', adminController.insertup);
router.get('/logout', adminController.backlogout);
router.get('/course', adminController.backcourse);
router.get('/admin', adminController.backadmin);
router.get('/profile', adminController.back);
router.get('/:id/delete', adminController.delete);
router.get('/', adminController.admin);
module.exports = router;