const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');


router.get('/insert', adminController.insert);
router.post('/insert', adminController.insertup);
router.get('/logout', adminController.backlogout);
router.get('/course', adminController.backcourse);
router.get('/admin', adminController.backadmin);
router.get('/profile', adminController.back);
router.get('/:id/logout', adminController.backlogout);
router.get('/:id/course', adminController.backcourse);
router.get('/:id/admin', adminController.backadmin);
router.get('/:id/profile', adminController.back);

router.get('/:id/delete', adminController.deletevideo);
router.get('/:id/addvideo', adminController.addvideo);
router.post('/:id/addvideo', adminController.postvideo);
router.get('/:id/edit', adminController.edit);
router.post('/:id/edit', adminController.update);
router.get('/insert', adminController.insert);
router.post('/insert', adminController.insertup);
router.post('/:id/delete', adminController.delete);
router.get('/', adminController.admin);
module.exports = router;