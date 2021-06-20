// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');

const app = express();

require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const userPage = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userPage);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
    .then(() => { console.log('MongoDB Connected!') })
    .catch(err => {
        console.error(err);
    });



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`We are live on PORT: ${PORT}`);
});