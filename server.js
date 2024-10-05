const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/tasks', (req, res) => {
    db.all('SELECT * FROM tasks', [], (err, rows) => {
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
    
    db.run(`INSERT INTO concerns (latitude, longitude) VALUES (?, ?)`, [latitude, longitude], function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID }); // Return the ID of the inserted record
    });
});



app.post('/reviews', (req, res) => {
    const {latitude, longitude, category, message} = req.body; // Get latitude and longitude from the request body

    const values = [
    latitude || null,
    longitude || null,
    category || null,
    message || null,
    ];
    
    // const { latitude, longitude } = req.body; // Get latitude and longitude from the request body
    db.run(`INSERT INTO reviews (latitude, longitude, message, nature) VALUES (?, ?, ?, ?)`, values, function (err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID }); // Return the ID of the inserted record
    });
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
