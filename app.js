// jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const indexRouter = require('./routes/index');
const userPage = require('./routes/users');

app.use('/', indexRouter);
app.use('/user', userPage);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`We are live on PORT: ${PORT}`);
});