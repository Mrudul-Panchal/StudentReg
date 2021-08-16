const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
dotenv.config({ path: './config.env'});
require('./db/conn');

const PORT = process.env.PORT;
