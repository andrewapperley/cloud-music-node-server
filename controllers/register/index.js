'use strict';

var RegisterModel = require('../../models/viewModels/register'),
    ClientModel = require('../../models/client');


module.exports = function (router) {

    router.get('/', function (req, res) {

        var model = new RegisterModel();

        res.render('register', model);

    });

    router.post('/', function (req, res) {
        var name = req.body.name;
        var email = req.body.email;
        var password = req.body.password;
        var model = new RegisterModel();

        if (name && email && password) {

            ClientModel.validateName(name)
            .then(function(id) {
                  if (!id) {
                     var client = new ClientModel({
                          name: name,
                          email: email,
                          password: password
                      });
                      return client.save();
                  } else {
                      throw new Error("Name is already registered.");
                  }
                })
            .then(function(client) {
                    return res.render("register", model);
                })
            .catch(function(err) {
                    console.log(err);
                    return res.render("register", model);
                });

        } else {
            /**
             * Send back errors about which one is missing
             */

            return res.render("register", model);
        }
    });

};
