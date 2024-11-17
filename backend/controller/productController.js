const Product = require('../models/product.model');
const fs = require('fs');
const path = require('path');

const createProduct = async (req, res) => {
    console.log(req.body); // Log the request body to check its content
    try {
        const images = req.files.map(file => file.path);
        const productData = { ...req.body, images };
        const product = new Product(productData);
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'Error adding product. Please try again later.' });
    }
};

const getProducts = async (req, res) => {
    try {
        const allPets = await Product.find();
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
        res.status(200).json({ success: true, allPets: allProducts });
    } catch (error) {
        console.error('Error getting products:', error);
        res.status(500).json({ success: false, message: 'Error fetching products. Please try again later.' });
    }
};

const updateProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : product.images;
        const updatedProductData = { ...req.body, images };
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedProductData, { new: true });

        res.status(200).json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Error updating product. Please try again later.' });
    }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found' });
        }

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
        res.status(500).json({ message: 'Error deleting product. Please try again later.' });
    }
};

module.exports = { createProduct, getProducts, updateProduct, deleteProduct };


