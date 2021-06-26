const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddlewares = require('../middlewares/authmiddlewares');
const multer = require('multer');
let upload = multer({ dest: './public/uploads' });

router.get('/pinread', adminController.pinread);
router.post('/:id/deleteletter', adminController.delletter);
router.get('/:name/read', adminController.read);
router.get('/thongbao', adminController.thongbao);
router.get('/insert', adminController.insert);
router.post('/insert', upload.single('img'), adminController.insertup);
router.get('/:id/delete', adminController.deletevideo);
router.get('/:id/addvideo', adminController.addvideo);
router.post('/:id/addvideo', adminController.postvideo);
router.get('/:id/edit', adminController.edit);
router.post('/:id/edit', upload.single('img'), adminController.update);
router.post('/:id/delete', adminController.delete);
router.post(
    '/position-change/:id',
    authMiddlewares.requireAdminLimit,
    adminController.positionChange,
);
router.post(
    '/:id/deleteuser',
    authMiddlewares.requireAdminLv1,
    adminController.deleteuser,
);
router.get(
    '/:name/chitiet',
    authMiddlewares.requireAdminLv1,
    adminController.chitiet,
);
router.get(
    '/payments',
    authMiddlewares.requireAdminLimit,
    adminController.payments,
);
router.get(
    '/thanhvien',
    authMiddlewares.requireAdminLv1,
    adminController.thanhvien,
);
router.get(
    '/thanhvien/timkiem',
    authMiddlewares.requireAdminLv1,
    adminController.timkiem,
);
router.post(
    '/block/:id',
    authMiddlewares.requireAdminLv1,
    adminController.block,
);
router.get('/', adminController.admin);
module.exports = router;
