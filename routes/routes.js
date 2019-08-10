var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, passport) {


    app.get('/api/test', function (req, res) {
        res.json('test.js')
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.json('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.json('/');
    });

    app.get('/login', function (req, res) {
        res.json('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    app.get('/signup', function (req, res) {
        res.json('signup.ejs', { message: req.flash('signupMessage') });
    });

    //posting a picture


    //post button

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

};
// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();

    res.json('/');
}
