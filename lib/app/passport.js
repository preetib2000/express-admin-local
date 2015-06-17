//var LocalStrategy   = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth').Strategy;
var LocalStrategy   = require('passport-local').Strategy;
var mysql = require('mysql');

var connection = mysql.createConnection({
    host            : 'localhost',
    user            : 'preeti',
    password        : '',
    database        : 'espressProject'
});

connection.query('USE espressProject;');



// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        connection.query("select * from user where id = "+id,function(err,rows){
            done(err, rows[0]);
        });

    });

//    passport.use('ldap-login', new LdapStrategy({
//            usernameField: 'username',
//            passwordField: 'password',
//            server: {
//                url: 'ldap://ldap.forumsys.com:389',
//                bindDn: "cn=read-only-admin,dc=example,dc=com",
//                bindCredentials: 'password',
//                searchBase: 'ou=mathematicians,dc=example,dc=com',
//                searchFilter: 'uid={{euclid}}'
//            }
//        },
//        function (user, done) {
//            console.log('preeti');
//            return done(null, user);
//        }
//    ));

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) { // callback with email and password from our form

            connection.query("SELECT * FROM `user` WHERE `username` = '" + username + "'",function(err,rows){
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
                }

                // if the user is found but the password is wrong
                if (!( rows[0].password == password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata

                // all is well, return successful user
                console.log('Login Successful');
                return done(null, rows[0].id);

            });



        }));

};
