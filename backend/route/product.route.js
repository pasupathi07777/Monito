const express = require('express');
const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controller/productController');
const multer = require('multer');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage });

// Routes
router.post('/postproduct', upload.array('images', 10), createProduct);
router.get("/getproduct", getProducts)
router.put('/updateproduct/:id', upload.array('images', 10), updateProduct);  // Make sure to include multer for uploads
router.delete('/deleteproduct/:id', deleteProduct);
module.exports = router;
