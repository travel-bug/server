var LocalStrategy = require('passport-local').Strategy;
const passport = require("passport");
var mysql = require('mysql');
const connection = require('./connection');
const user = require('./models/user');


// expose this function to our app using module.exports

passport.serializeUser(function (user, done) {
    done(null, user.id);
});
// used to deserialize the user
passport.deserializeUser(function (id, done) {
    connection.query("select * from people where id = " + id, function (err, rows) {
        done(err, rows[0]);
    });
});

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, username, password, done) {
        console.log("TEST2");
        console.log(username, password);
        let userObj = {
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            firstName: req.body.firstname,
            lasName: req.body.lastname
        }
        user.insertNewUser(userObj, function (err, result) {
            // return done(null, {id: 4})
            userObj.id = result.insertId;
            return done(null, userObj);
        });
    }));

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, username, password, done) { // callback with email and password from our form
        console.log(username, password);
        let userObj = {
            username: username,
            password: password
        };
        user.loginUser(userObj, function (err, result) {
            console.log(result);
            // userObj.id = result.insertId;
            return done(null, result);
        });
    }));


module.exports = passport;