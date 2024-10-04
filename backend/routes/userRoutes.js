const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.post('/register', async (req, res) => {
    const { name, email, phoneNumber, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ name, email, phoneNumber, password: hashedPassword });
        await user.save();
        return res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
        return res.status(500).json({ message: 'Error registering user', error: err.message });
    }
});

module.exports = router;
