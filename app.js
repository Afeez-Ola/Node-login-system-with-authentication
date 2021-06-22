// jshint esversion:6
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

require('./config/passport')(passport);
const app = express();

// require('../config/passport')(passport);

app.use(express.urlencoded({ extended: false }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
})

const indexRouter = require('./routes/index');
const userPage = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userPage);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((user) => { console.log(`MongoDB Connected!`); })
    .catch(err => {
        console.error(err);
    });



const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`We are live on PORT: ${PORT}`);
});