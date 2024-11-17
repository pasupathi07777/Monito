const mongoose = require('mongoose');
require('dotenv').config()

// MongoDB connection (replace with your MongoDB Atlas connection string)
const connectDb = () => {
    mongoose.connect(process.env.MONGO_DB_URL)
        .then(() => {
            console.log('MongoDB connected');
        })
        .catch(err => {
            console.error('MongoDB connection error:', err);
        });
}

module.exports = connectDb
