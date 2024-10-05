const express = require('express');
const db = require('./database');
const app = express();
const PORT = 3000;

app.use(express.json());
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



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
