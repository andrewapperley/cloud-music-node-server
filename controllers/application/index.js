'use strict';

var ApplicationModel = require('../../models/viewModels/application');


module.exports = function (router) {

    router.get('/*', function (req, res) {
        var model = new ApplicationModel();
        res.render('application', model);
    });

};
