const animalModel = require('../models/addAnimal.model');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

// Add a new product
const addProduct = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        const productData = { ...req.body, images };
        const product = new animalModel(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: error.message });
    }
};

const getAnimals = async (req, res) => {
    try {
        const allPets = await animalModel.find();
        const allProducts = await Promise.all(
            allPets.map(async (pet) => {
                const images = await Promise.all(
                    pet.images.map(async (imgPath) => {
                        const imagePath = path.join(__dirname, '..', imgPath);
                        try {
                            const data = await fs.promises.readFile(imagePath);
                            return data.toString('base64');
                        } catch (error) {
                            console.error('Error reading image file:', error);
                            return null;
                        }
                    })
                );
                return { ...pet._doc, images: images.filter((img) => img !== null) };
            })
        );
        // console.log(allProducts)
        res.status(200).json({ success: true, allPets: allProducts });
    } catch (error) {
        console.error('Error getting animals:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

























const getAnimalById = async (req, res) => {
    const { id } = req.params; // Extracting the id from the request parameters
    try {
        // Convert string ID to ObjectId if valid
        const objectId = mongoose.Types.ObjectId.isValid(id) ? new mongoose.Types.ObjectId(id) : null; // Use 'new'

        if (!objectId) {
            return res.status(400).json({ success: false, message: 'Invalid ID format' });
        }

        // Find the animal by id in the database
        const pet = await animalModel.findById(objectId);
        if (!pet) {
            return res.status(404).json({ success: false, message: 'Animal not found' });
        }

        // Process images if they exist
        const images = await Promise.all(
            pet.images.map(async (imgPath) => {
                const imagePath = path.join(__dirname, '..', imgPath);
                try {
                    const data = await fs.promises.readFile(imagePath);
                    return data.toString('base64');
                } catch (error) {
                    console.error('Error reading image file:', error);
                    return null;
                }
            })
        );

        // Send response with the specific pet details
        res.status(200).json({ success: true, pet: { ...pet._doc, images: images.filter((img) => img !== null) } });
    } catch (error) {
        console.error('Error getting animal by ID:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Update a pet product
const updateAnimal = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await animalModel.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Use existing images if no new files are uploaded
        const images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : product.images;

        const updatedProductData = { ...req.body, images };
        const updatedProduct = await animalModel.findByIdAndUpdate(id, updatedProductData, { new: true });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete a pet product
const deleteAnimal = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProduct = await animalModel.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Delete associated images from the server
        await Promise.all(deletedProduct.images.map(async (imgPath) => {
            const imagePath = path.join(__dirname, '..', imgPath);
            try {
                await fs.promises.unlink(imagePath);
            } catch (error) {
                console.error('Error deleting image file:', error);
            }
        }));

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addProduct, getAnimals, updateAnimal, deleteAnimal, getAnimalById };

