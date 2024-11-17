const informationInfoModel = require('../models/info.model');
const fs = require('fs');
const path = require('path');

// Add new information
const addInformation = async (req, res) => {
    try {
        const images = req.files.map(file => file.path);
        const informationData = { ...req.body, images };
        const information = new informationInfoModel(informationData);
        await information.save();
        res.status(201).json(information);
    } catch (error) {
        console.error('Error adding information:', error);
        res.status(500).json({ message: error.message });
    }
};

// Get all information entries
const getInformation = async (req, res) => {
    try {
        const allInformation = await informationInfoModel.find();
        const allEntries = await Promise.all(
            allInformation.map(async (info) => {
                const images = await Promise.all(
                    info.images.map(async (imgPath) => {
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
                return { ...info._doc, images: images.filter((img) => img !== null) };
            })
        );
        res.status(200).json({ success: true, allInformation: allEntries });
    } catch (error) {
        console.error('Error getting information:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// Update an information entry
const updateInformation = async (req, res) => {
    const { id } = req.params;
    try {
        const information = await informationInfoModel.findById(id);
        if (!information) {
            return res.status(404).json({ message: 'Information entry not found' });
        }

        // Use existing images if no new files are uploaded
        const images = req.files && req.files.length > 0 ? req.files.map(file => file.path) : information.images;

        const updatedInformationData = { ...req.body, images };
        const updatedInformation = await informationInfoModel.findByIdAndUpdate(id, updatedInformationData, { new: true });

        res.status(200).json(updatedInformation);
    } catch (error) {
        console.error('Error updating information:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an information entry
const deleteInformation = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedInformation = await informationInfoModel.findByIdAndDelete(id);
        if (!deletedInformation) {
            return res.status(404).json({ message: 'Information entry not found' });
        }

        // Delete associated images from the server
        await Promise.all(deletedInformation.images.map(async (imgPath) => {
            const imagePath = path.join(__dirname, '..', imgPath);
            try {
                await fs.promises.unlink(imagePath);
            } catch (error) {
                console.error('Error deleting image file:', error);
            }
        }));

        res.status(200).json({ message: 'Information entry deleted successfully' });
    } catch (error) {
        console.error('Error deleting information:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addInformation, getInformation, updateInformation, deleteInformation };
