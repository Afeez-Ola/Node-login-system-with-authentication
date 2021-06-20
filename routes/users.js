// jshint esversion:6
const express = require('express');
const router = express.Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    // console.log(req.body.name);
    // const { name, email, password, password2 } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const password2 = req.body.password2;

    const errors = [];

    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all field!' });
    }
});


module.exports = router;