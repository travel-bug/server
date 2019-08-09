
var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

// var configAuth = require('./auth'); // use this one for testing

module.exports = function (passport) {


    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });


    passport.use('local-login', new LocalStrategy({

        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // checks if a user is logged in
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase();

            process.nextTick(function () {
                User.findOne({ 'local.email': email }, function (err, user) {
                    if (err)
                        return done(err);

                    if (!user)
                        return done(null, false, req.flash('loginMessage', 'No user found.'));

                    if (!user.validPassword(password))
                        return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));

                    else
                        return done(null, user);
                });
            });

        }));

    passport.use('local-signup', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
        function (req, email, password, done) {
            if (email)
                email = email.toLowerCase();

            process.nextTick(function () {
                if (!req.user) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err)
                            return done(err);

                        // check to see if theres already a user with that email
                        if (user) {
                            return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
                        } else {

                            // create the user
                            var newUser = new User();

                            newUser.local.email = email;
                            newUser.local.password = newUser.generateHash(password);

                            newUser.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, newUser);
                            });
                        }

                    });

                } else if (!req.user.local.email) {
                    User.findOne({ 'local.email': email }, function (err, user) {
                        if (err)
                            return done(err);

                        if (user) {
                            return done(null, false, req.flash('loginMessage', 'That email is already taken.'));

                        } else {
                            var user = req.user;
                            user.local.email = email;
                            user.local.password = user.generateHash(password);
                            user.save(function (err) {
                                if (err)
                                    return done(err);

                                return done(null, user);
                            });
                        }
                    });
                } else {
                    return done(null, req.user);
                }

            });

        }));

};
