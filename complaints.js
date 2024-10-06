const { response } = require("express");

function getValues(databaseObject, responseObject){
    databaseObject.all('SELECT * FROM concerns', [], (err, rows) => {
        if (err) {
            responseObject.status(500).json({ error: err.message });
            return;
        }
        responseObject.json(rows);
    });
}



module.exports = {
    getValues
};