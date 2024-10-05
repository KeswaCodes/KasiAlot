const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');
const path = require('path');

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: function (req, file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
        }
    }
});

// Create a post (complaint or review) with optional image
router.post('/', upload.single('image'), async (req, res) => {
    const { title, content, username, postType, nature } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    try {
        if (!['complaint', 'review'].includes(postType)) {
            return res.status(400).json({ message: 'Invalid post type' });
        }

        const post = new Post({
            title,
            content,
            username,
            postType,
            nature,
            imageUrl
        });

        await post.save();
        return res.status(201).json({ message: 'Post created successfully', post });
    } catch (err) {
        return res.status(500).json({ message: 'Error creating post', error: err.message });
    }
});

// Other routes like getting posts or user posts remain the same...

module.exports = router;
