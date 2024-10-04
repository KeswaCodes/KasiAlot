require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const connect = require('./config/db')
const userRoutes = require('./routes/userRoutes'); 

const app = express();
const PORT = process.env.PORT || 5000;


const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions)); 

app.use(express.json());
app.use('/api/users', userRoutes);
app.post('/', (request, response) => {
    response.send('Hello, Big Man!')
})

app.listen(PORT, async () => {
    try {
        // await connect();
        console.log(`Listening at http://localhost:${PORT}`);
    } catch (error) {
        console.log('MongoDB connection error:', error.message);
    }
});
