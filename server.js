const express = require('express');
const app = express();
const PORT = process.env.PORT || 3005;
const session = require('express-session');
const mongoose = require('mongoose');
const userRoute = require('./routes/user');
const dotenv = require('dotenv');

dotenv.config();

app.set('view engine', 'ejs')

app.use(session({
    secret: process.env.SESSION_SEC,
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 60 * 60 * 1000
    }
}))
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
mongoose.set('strictQuery', true)
mongoose.connect('mongodb://127.0.0.1:27017/AuthSystem')
.then(() => console.log('DB connected'))
.catch(err => console.log(err))


app.use('/auth/test', userRoute)

app.listen(PORT, () => console.log('server is running', PORT))