const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');


router.get('/insert', adminController.insert);
router.post('/insert', adminController.insertup);

router.get('/:id/delete', adminController.deletevideo);
router.get('/:id/addvideo', adminController.addvideo);
router.post('/:id/addvideo', adminController.postvideo);
router.get('/:id/edit', adminController.edit);
router.post('/:id/edit', adminController.update);
router.get('/insert', adminController.insert);
router.post('/insert', adminController.insertup);
router.post('/:id/delete', adminController.delete);
router.post('/:id/deleteuser', adminController.deleteuser);
router.get('/:name/chitiet', adminController.chitiet);
router.get('/thanhvien', adminController.thanhvien);
router.get('/', adminController.admin);
module.exports = router;