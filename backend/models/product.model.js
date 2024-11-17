const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    seller: { type: String, required: true },
    stock: { type: Number, required: true },
    description: { type: String },
    quantity: { type: String },
    images: [{ type: String }], 
});

module.exports = mongoose.model('Product', ProductSchema);
