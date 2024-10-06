const express = require('express');
const db = require('./database');
const bcrypt = require('bcrypt');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());


const validateRegistrationData = ({ name, email, username, contactNumber, userPassword, confirmPassword }) => {
    if (!name || !email || !username || !contactNumber || !userPassword || !confirmPassword) {
        return { valid: false, message: 'All fields are required.' };
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return { valid: false, message: 'Invalid email format.' };
    }
    if (userPassword.length < 8) {
        return { valid: false, message: 'Password must be at least 8 characters long.' };
    }
    if (userPassword !== confirmPassword) {
        return { valid: false, message: 'Passwords do not match.' };
    }
    return { valid: true };
};

app.post('/register', (req, res) => {
    const { name, email, username, contactNumber, userPassword, confirmPassword } = req.body;

    const validation = validateRegistrationData({ name, email, username, contactNumber, userPassword, confirmPassword });
    if (!validation.valid) {
        return res.status(400).json({ error: validation.message });
    }

    db.get('SELECT * FROM users WHERE email = ? OR username = ?', [email, username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (user) {
            return res.status(400).json({ error: 'Email or username already in use.' });
        }

        bcrypt.hash(userPassword, 10, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Error hashing password.' });
            }

            const values = [name, email, username, contactNumber, hashedPassword];
            db.run(`INSERT INTO users (name, email, username, contactNumber, password) VALUES (?, ?, ?, ?, ?)`, values, function (err) {
                if (err) {
                    return res.status(500).json({ error: 'Failed to register user.' });
                }
                res.status(201).json({ message: 'User registered successfully.', userId: this.lastID });
            });
        });
    });
});

app.post('/login', (req, res) => {
    const { username, userPassword } = req.body;

    db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
        if (err) {
            return res.status(500).json({ error: 'Database error.' });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid username or password.' });
        }

        bcrypt.compare(userPassword, user.password, (err, match) => {
            if (err || !match) {
                return res.status(401).json({ error: 'Invalid username or password.' });
            }
            res.json({ message: 'Login successful!', userId: user.id });
        });
    });
});


app.get('/concerns', (req, res) => {
    db.all('SELECT * FROM concerns', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.get('/reviews', (req, res) => {
    db.all('SELECT * FROM reviews', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});


app.post('/concerns', (req, res) => {
    const {latitude, longitude, category, message, priority} = req.body; // Get latitude and longitude from the request body

    const values = [
        latitude || null,
        longitude || null,
        message || null,  // Make sure to maintain the same order as in the SQL statement
        category || null,
        priority || null
    ];
    
    db.run(`INSERT INTO concerns (latitude, longitude, category, message, priority) VALUES (?, ?, ?, ?, ?)`, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID }); // Return the ID of the inserted record
    });
});

app.post('/reviews', (req, res) => {
    const {latitude, longitude, message, nature} = req.body; // Get latitude and longitude from the request body

    const values = [
        latitude || null,
        longitude || null,
        message || null,  // Make sure to maintain the same order as in the SQL statement
        nature || null,
    ];
    
    db.run(`INSERT INTO reviews (latitude, longitude, message, nature) VALUES (?, ?, ?, ?)`, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID }); // Return the ID of the inserted record
    });
});

app.post('/', (req, res) => {
    res.status(200).json({"Success" : "Endpoint hit successfully"})
})


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
