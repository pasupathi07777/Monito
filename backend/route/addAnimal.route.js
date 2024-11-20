const express = require('express');
const multer = require('multer');
const { addProduct, getAnimals, updateAnimal, deleteAnimal, getAnimalById } = require('../controller/addAnimal.controler');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});


const upload = multer({ storage: storage });

// Add a new product
router.post('/add', upload.array('image', 10), addProduct);
router.get('/getanimals', getAnimals);
router.get('/getAnimalById/:id', getAnimalById);
router.put('/updateanimal/:id', upload.array('image', 10), updateAnimal); 
router.delete('/deleteanimal/:id', deleteAnimal);

module.exports = router;
