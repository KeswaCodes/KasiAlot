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
        longitude INTEGER
    )`);

});

module.exports = db;
