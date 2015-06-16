//var LocalStrategy   = require('passport-local').Strategy;
var LdapStrategy = require('passport-ldapauth').Strategy;
var mysql = require('mysql');

var connection = mysql.createConnection({
    socketPath      : '/Applications/MAMP/tmp/mysql/mysql.sock',
    user            : 'root',
    password        : 'root',
    database        : 'express-admin-ldap'
});

//connection.query('USE express-admin-ldap;');



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

    passport.use('ldap-login', new LdapStrategy({
            usernameField: 'username',
            passwordField: 'password',
            server: {
                url: 'ldap://ldap.forumsys.com:389',
                bindDn: "cn=read-only-admin,dc=example,dc=com",
                bindCredentials: 'password',
                searchBase: 'ou=mathematicians,dc=example,dc=com',
                searchFilter: 'uid={{euclid}}'
            }
        },
        function (user, done) {
            console.log('preeti');
            return done(null, user);
        }
    ));

};
