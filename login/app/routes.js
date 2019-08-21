module.exports = function (app, passport) {


    app.get('/', function (req, res) {
        res.render('index.ejs');
    });

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    app.post(url, (req, res)=>{
    let email = req.body.email 
});

app.post(url, (req, res)=>{
    let password = req.body.password
    let username = req.body.username
    let firstName = req.body.firstName
    let lastName = req.body.username

});
app.post ('/login', function (req, res, next){
    passport.authenticate('local-login'),
    {
        successRedirect: '/profile',
        failureRedirect: '/login',
        failureFlash : true,
}
});
app.post('/login', function (req, res, next) { 
    passport.authenticate('local-login'),
    {
      successRedirect: '/profile',
      failureRedirect: '/login',
      failureFlash: true,
    },
    app.get('/login', function (req, res) {
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));


    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));





});

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated());
        return next();

    res.redirect('/');
}
