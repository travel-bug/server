let orm = require("../orm");

let user = {
    insertNewUser: function (user, callback) {
        var userObj = {

        }
        userObj.person_email = user.email.toLowerCase();
        userObj.username = user.username.toLowerCase();
        userObj.person_password = user.password;
        // userObj.person_firstName = user.firstname;
        // userObj.person_lastName = user.lastname;
        let query = {
            table: 'people',
            data: userObj
        };
        orm.insert(query, callback);
    },

    loginUser: function (user, callback) {
        var userObj = {

        }
        userObj.username = user.username;
        userObj.person_password = user.password;
        let query = {
            table: 'people',
            data: userObj
        };
        orm.select(query, callback);
    }
    // loginUser: function (user, callback) {
    // }
    //     orm.select({
    //         table: 'people',
    //         column: 'username',
    //         value: request.body.username
    //     }, function (error, result) {
    //         response.json(result);


    //     });
    // }



};



module.exports = user;