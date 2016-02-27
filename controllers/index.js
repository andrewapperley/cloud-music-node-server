'use strict';

var IndexModel = require('../models/viewModels/index');


module.exports = function (router) {

    var model = new IndexModel();

    router.get('/', function (req, res) {

        res.render('index', model);

    });

    /**
     * Logout current user
     */

    router.get("/logout", function(req, res) {
        req.logout();
        res.redirect('/login');
    });


};
