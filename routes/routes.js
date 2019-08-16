var LocalStrategy = require('passport-local').Strategy;

module.exports = function (app, passport) {

    app.post('/api/signup', passport.authenticate("local-signup"), (req, res)=>{
    
        console.log(req.user)
        res.json(req.user);
      
     });

     app.post('/api/signin', passport.authenticate("local-login"), (req, res)=>{
    
        console.log(req.user)
        res.json(req.user);
      
     });

    
  

    //posting a picture


    //post button

    // process the signup form
  

};
// route middleware to ensure user is logged in

