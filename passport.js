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
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, email, password, done) {
        console.log("TEST2");

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

        



        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        // connection.query("select * from people where person_email = '" + email + "'", function (err, rows) {
        //     console.log(rows);
        //     console.log("above row object");
        //     if (err)
        //         return done(err);
        //     if (rows.length) {
        //         return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
        //     } else {
        //         // if there is no user with that email
        //         // create the user
        //         var newUserMysql = new Object();
        //         newUserMysql.email = email;
        //         newUserMysql.password = password; // use the generateHash function in our user model
        //         var insertQuery = "INSERT INTO people ( person_email, person_password ) values ('" + email + "','" + password + "')";
        //         console.log(insertQuery);
        //         connection.query(insertQuery, function (err, rows) {
        //             newUserMysql.id = rows.insertId;
                    // return done(null, newUserMysql);
                    
        //         });
        //     }
        // });
    }));

passport.use('local-login', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true // allows us to pass back the entire request to the callback
},
    function (req, email, password, done) { // callback with email and password from our form
        // connection.query("SELECT * FROM `people` WHERE `email` = '" + email + "'", function (err, rows) {
        //     if (err)
        //         return done(err);
        //     if (!rows.length) {
        //         return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
        //     }
        //     // if the user is found but the password is wrong
        //     if (!(rows[0].password == password))
        //         return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
        //     // all is well, return successful user
        //     return done(null, rows[0]);
        // });
    }));


module.exports = passport;