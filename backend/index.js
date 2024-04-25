const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());
require('dotenv').config()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL);

// Define Job Application schema
const jobApplicationSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    position: String,
    coverLetter: String,
});

// Create Job Application model
const JobApplication = mongoose.model('JobApplication', jobApplicationSchema);

// Endpoint to create a new job application
app.post('/apply', async (req, res) => {
    const { name, email, phone, position, coverLetter } = req.body;
    const newApplication = new JobApplication({ name, email, phone, position, coverLetter });
    try {
        const result = await newApplication.save();
        res.status(201).json({ success: true, data: result });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});
const port = process.env.PORT
// Start the server
app.listen(port, () => {
    console.log('Server is running on port ' +port);
});
