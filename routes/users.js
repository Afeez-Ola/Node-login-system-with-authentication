// jshint esversion:6
const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.send('Registration Page');
});

router.get('/login', (req, res) => {
    res.send('Login Page');
});


module.exports = router;