require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const router = require('./routes/router.routes');
const path = require('path');


app.use(express.static(path.join(__dirname, '../', 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.set('view engine', 'ejs');
app.use('/', router)



module.exports = http;