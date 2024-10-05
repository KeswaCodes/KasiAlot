const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { check } = require('express-validator');


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

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        return res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
        return res.status(500).json({ message: 'Error logging in', error: err.message });
    }
});

router.post(
    '/registerAdmin',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('username', 'Username is required').not().isEmpty(),
        check('contactNumber', 'Contact number is required').not().isEmpty(),
        check('role', 'Role is required and must be either admin or government').isIn(['admin', 'government']),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, username, contactNumber, role } = req.body;

        try {
            const existingUser = await User.findOne({ $or: [{ email }, { username }] });
            if (existingUser) {
                return res.status(400).json({ message: 'User already exists' });
            }

            const user = new User({
                name,
                email,
                username,
                contactNumber,
                role, 
            });

            await user.save();

            return res.status(201).json({ message: 'Admin/Government user registered successfully', user });
        } catch (err) {
            return res.status(500).json({ message: 'Error registering user', error: err.message });
        }
    }
);


module.exports = router;
