// jshint esversion:6
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../model/User');

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

    if (password !== password2) {
        errors.push({ msg: `Password does not match!` });
    }

    if (password.length < 6) {
        errors.push({ msg: 'Password should be at least 6 characters' });
    }

    if (errors.length > 0) {
        res.render('register', {
            errors,
            name,
            email,
            password,
            password2
        });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push({ msg: 'Email is already registered!' });
                    res.render('register', {
                        errors,
                        name,
                        email,
                        password,
                        password2
                    });
                } else {
                    const newUser = new User({
                        name,
                        email,
                        password
                    });
                    console.log(newUser);
                    res.send(`Hello ${name}`);
                }

            });
    }
});


module.exports = router;


module.exports = router;