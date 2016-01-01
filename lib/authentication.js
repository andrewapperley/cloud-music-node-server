var LocalStrategy = require('passport-local').Strategy,
    Client = require('../models/client'),
    passport = require('passport');

function localStrategy() {

    return new LocalStrategy(function(email, password, done) {

        //Retrieve the user from the database by login
        Client.findOne({
            email: email
        }, function(err, client) {
            //If something weird happens, abort.
            if (err) {
                return done(err);
            }

            //If we couldn't find a matching user, flash a message explaining what happened
            if (!client) {
                return done(null, false, {
                    message: 'Login not found'
                });
            }

            //Make sure that the provided password matches what's in the DB.
            client.passwordMatches(password, function(error, matched) {
                if (error || !matched) {
                    done(null, false, {
                        message: 'Incorrect Password'
                    });
                } else {
                    if (client.activated && !client.suspended) {
                        //If everything passes, return the retrieved user object.
                        done(null, client);
                    } else {
                        done(null, false, {
                            message: 'Client is not enabled'
                        });
                    }

                }
            });

        });
    });
}


module.exports.setup = function setup(app) {
    app.on('middleware:after:session', function configPassport() {
        //Tell passport to use our newly created local strategy for authentication
        passport.use(localStrategy());
        //Give passport a way to serialize and deserialize a user. In this case, by the user's id.
        passport.serializeUser(Client.serialize);
        passport.deserializeUser(Client.deserialize);
        app.use(passport.initialize());
        app.use(passport.session());
    });
};
