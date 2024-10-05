const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json());
app.get('/tasks', (req, res) => {
    console.log("Found it")
    console.log(req)
    db.all('SELECT * FROM tasks', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(rows);
    });
});

app.post('/concerns', (req, res) => {
    const { latitude, longitude } = req.body; // Get latitude and longitude from the request body
    db.run(`INSERT INTO concerns (latitude, longitude) VALUES (?, ?)`, [latitude, longitude], function (err) {
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
