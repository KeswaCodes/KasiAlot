const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS concerns (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude INTEGER,
        longitude INTEGER,
        category TEXT,
        message TEXT,
        priority INTEGER,
        img BLOB
    )`);


    db.run(`CREATE TABLE IF NOT EXISTS reviews (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        latitude INTEGER,
        longitude INTEGER,
        message TEXT,
        nature TEXT
    )`);

    db.run(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            username TEXT NOT NULL UNIQUE,
            contactNumber TEXT NOT NULL,
            password TEXT NOT NULL
        )
    `);

});

module.exports = db;
