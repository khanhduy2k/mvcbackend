const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/img') 
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

const upload = multer({ storage: storage }).single('img')

router.get('/pinread', adminController.pinread);
router.post('/:id/deleteletter', adminController.delletter);
router.get('/:name/read', adminController.read);
router.get('/thongbao', adminController.thongbao);
router.get('/insert', adminController.insert);
router.post('/insert', upload, adminController.insertup);
router.get('/:id/delete', adminController.deletevideo);
router.get('/:id/addvideo', adminController.addvideo);
router.post('/:id/addvideo', adminController.postvideo);
router.get('/:id/edit', adminController.edit);
router.post('/:id/edit', adminController.update);
router.post('/:id/delete', adminController.delete);
router.post('/:id/deleteuser', adminController.deleteuser);
router.get('/:name/chitiet', adminController.chitiet);
router.get('/thanhvien', adminController.thanhvien);
router.get('/thanhvien/timkiem', adminController.timkiem);
router.get('/', adminController.admin);
module.exports = router;