const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
dotenv.config({ path: './config.env'});
require('./db/conn');
const User = require('./studentAPI');

app.use(cookieParser())
app.use(express.json());

const PORT = process.env.PORT;


app.use(require ('./router/auth'));

app.get('/signin', (req, res) => {
    res.send('Login here')
});

app.get('/signup', (req, res) => {
    res.send('Register')
});


app.listen(PORT, () => {
    console.log('running on port ', PORT )
})