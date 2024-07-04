require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const router = require('./routes/router.routes')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', router)


module.exports = http;