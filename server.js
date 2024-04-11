const path = require('path');
const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const port = process.env.PORT || 5000;


connectDB();
const app = express()
app.use(cors());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/posts', require('./routes/postsRoutes'))
app.use('/api/users', require('./routes/userRoutes'))


app.use(errorHandler);
app.listen(port, () => console.log(`server starts on port ${port}`))