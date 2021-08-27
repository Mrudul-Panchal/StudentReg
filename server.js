const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
dotenv.config({ path: './config.env'});
require('./db/conn');
const User = require('./studentAPI');

const logger = require("morgan");
const cors = require("cors");
const session = require('express-session');
const MongoStore = require("connect-mongo");

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


app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.MONGO_SECRET,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
      ttl: 12 * 60 * 60,
    }),
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());

app.use("/api", require("./routes"));

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('listening at http://localhost:$(port)'));