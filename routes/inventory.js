const itemController = require('../controllers/itemController');
const categoryController = require('../controllers/categoryController');

const express = require('express');
const router = express.Router();

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + file.originalname;
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
const upload = multer({ storage: storage });


router.get('/', itemController.index);

// item routes

router.get('/item/create', itemController.itemCreateGet);

router.post('/item/create', upload.single('itemImage'), itemController.itemCreatePost);

router.get('/item/:id/update', itemController.itemUpdateGet);

router.post('/item/:id/update', upload.single('itemImage'), itemController.itemUpdatePost);

router.get('/item/:id/delete', itemController.itemDeleteGet);

router.post('/item/:id/delete', itemController.itemDeletePost);

router.get('/item/:id', itemController.itemDetail);

router.get('/items', itemController.itemList);


// category routes

router.get('/category/create', categoryController.categoryCreateGet);

router.post('/category/create', categoryController.categoryCreatePost);

router.get('/category/:id/update', categoryController.categoryUpdateGet);

router.post('/category/:id/update', categoryController.categoryUpdatePost);

router.get('/category/:id/delete', categoryController.categoryDeleteGet);

router.post('/category/:id/delete', categoryController.categoryDeletePost);

router.get('/category/:id', categoryController.categoryDetail);

router.get('/categories', categoryController.categoryList);

module.exports = router;