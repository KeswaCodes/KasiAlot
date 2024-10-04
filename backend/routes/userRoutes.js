const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    const { name, email, location, skills, contactNumber } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = new User({ name, email, location, skills, contactNumber });
        await user.save();
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

router.put('/update/:userId', async (req, res) => {
    const { userId } = req.params;
    const { name, location, skills, contactNumber } = req.body;

    try {
        const user = await User.findByIdAndUpdate(userId, { name, location, skills, contactNumber }, { new: true });
        return res.status(200).json({ message: 'User updated successfully', user });
    } catch (err) {
        return res.status(500).json({ message: 'Error updating user', error: err.message });
    }
});

module.exports = router;
