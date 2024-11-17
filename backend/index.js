const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require("./config/db");
const path = require('path');
const app = express();
const PORT = 5000;
const productRoutes = require('./route/product.route');
const addAnimalRoute = require('./route/addAnimal.route');
const infoRoute = require("./route/info.route")
const nodemailer = require('nodemailer');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images
dbConnection();

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/animal', addAnimalRoute);
app.use('/api/route', infoRoute)

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "21ucsa09@gmail.com",
        pass: "uxvy ddjj nzvu brsk",
    },
});

app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: '21ucsa09@gmail.com',
        subject: `New message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ message: 'Failed to send email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).json({ message: 'Email sent successfully' });
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
