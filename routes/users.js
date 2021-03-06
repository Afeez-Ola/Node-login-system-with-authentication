// jshint esversion:6
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');

require('../config/passport')(passport);

const User = require('../model/User');

router.get('/register', (req, res) => {
    res.render('register');
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/register', (req, res) => {
    const { name, email, password, password2 } = req.body;

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
                    // console.log(newUser);
                    // Hashing password
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;

                            newUser.password = hash;

                            newUser.save()
                                .then(user => {
                                    req.flash('success_msg', 'You are now registered, and can log in');
                                    res.redirect('/users/login');
                                })
                                .catch(err => {
                                    req.flash('error_msg', 'You are not registered');
                                });
                        });
                    });
                }
            });
    }
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are now logged out!');
    res.redirect('/users/login');
});

module.exports = router;