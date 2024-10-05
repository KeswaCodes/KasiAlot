require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const path = require('path');
const uri = process.env.MONGODB_URI;

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(uri);

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

const connection = mongoose.connection;

app.use(cors(corsOptions)); 

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);


app.post('/', (request, response) => {
    response.send('Hello, Big Man!')
})

app.listen(PORT, async () => {
    try {
        connection.once("open", () => {
            console.log("Database has been successfully connected!")
        })
        
        console.log(`Listening at http://localhost:${PORT}`);
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
    }
});