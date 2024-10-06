const express = require('express');
const db = require('./database');
const app = express();
const PORT = 4000;
const userComplaints = require('./complaints');

app.use(express.json());
app.get('/concerns', (req, res) => {
    let apiRes = userComplaints.getValues(db, res);
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


app.get('/user', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        let userDB = res.json(rows);
    });
});



//  adds new user to db
app.post('/user', (req, res) => {

    const {username, pswd} = req.body; // Get latitude and longitude from the request body
    const values = [
        username || null,
        pswd || null
    ];

    db.run(`INSERT INTO users (username, pswd) VALUES (?, ?)`, values, function (err) {
    if (err) {
        res.status(500).json({ error: err.message });
        return;
    }
    res.status(201).json({ id: this.lastID }); // Return the ID of the inserted record
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
    const {message} = req.body; // Get latitude and longitude from the request body
    const values = [
        message || null // Make sure to maintain the same order as in the SQL statement
];
    
    db.run(`INSERT INTO reviews (message) VALUES (?)`, values, function (err) {
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









