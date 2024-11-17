const express = require('express');
const multer = require('multer');
const { addInformation, getInformation, updateInformation, deleteInformation } = require('../controller/info.controller');

const router = express.Router();

// Configure multer for image storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Set the uploads directory for storing images
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Use a timestamp to avoid filename conflicts
    },
});

const upload = multer({ storage });

// Routes for information entries
router.post('/add', upload.array('images', 10), addInformation);  // Add new information with images
router.get('/getinformation', getInformation);  // Get all information entries
router.put('/updateinformation/:id', upload.array('images', 10), updateInformation);  // Update information entry with optional new images
router.delete('/deleteinformation/:id', deleteInformation);  // Delete an information entry

module.exports = router;
