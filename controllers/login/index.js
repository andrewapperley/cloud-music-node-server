'use strict';

var LoginModel = require('../../models/viewModels/login'),
    passport = require('passport');


module.exports = function (router) {

    var model = new LoginModel();

    router.get('/', function (req, res) {

        res.render('login', model);

    });

    router.post('/', function (req, res) {

        var email = req.body.username;
        var password = req.body.password;
        var model = new LoginModel();

        if (email && password) {

            return passport.authenticate('local', {
                successRedirect: '/application',
                failureRedirect: '/login',
                failureFlash: true
            })(req, res);

        } else {
            /* Determine which one was missing and send back an error */
            return res.render('login', model);
        }
    });
};
