const express = require('express');
const router = express.Router();
const Worker = require('../models/Worker');

router.post('/register', async (req, res) => {
    const { name, email, skills, contactNumber } = req.body;

    try {
        const existingWorker = await Worker.findOne({ email });
        if (existingWorker) {
            return res.status(400).json({ message: 'Worker already exists' });
        }

        const worker = new Worker({ name, email, skills, contactNumber });
        await worker.save();
        return res.status(201).json({ message: 'Worker registered successfully', worker });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering worker', error: err.message });
    }
});

module.exports = router;
