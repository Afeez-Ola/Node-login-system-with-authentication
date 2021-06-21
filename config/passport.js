// jshint esversion:10
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = require('../model/User');


module.exports = function(passport) {
    passport.use(
        new LocalStrategy({ userNameField: 'email' }, (email, password, done) => {
            User.findOne({ email: email })
                .then(user => {
                    if (!user) {
                        return done(null, false, { message: 'That email is not registered!' });
                    }

                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return don(null, user);
                        } else {
                            return done(null, false, { msg: 'Password is incorrect' });
                        }
                    });
                })
                .catch(err => console.log(err));
        }));
}