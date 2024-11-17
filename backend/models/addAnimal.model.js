const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    SKU: { type: String, required: true},
    gender: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: String, required: true },
    ageUnit: { type: String, required: true },
    size: { type: String, required: true },
    color: { type: String, required: true },
    vaccinated: { type: Boolean, default: false },
    dewormed: { type: Boolean, default: false },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    publishedDate: { type: Date, default: Date.now },
    additionalInfo: { type: String, required: true },
    images: [{ type: String }],
}, {
    timestamps: true,
});

const animalModel = mongoose.model('allAnimal', animalSchema);
module.exports = animalModel;
