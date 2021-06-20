// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.set('view engine', 'ejs');

const indexRouter = require('./routes/index');
const userPage = require('./routes/users');

app.use('/', indexRouter);
app.use('/users', userPage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`We are live on PORT: ${PORT}`);
});