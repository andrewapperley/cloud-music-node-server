'use strict';

var ClientModel = require('../../../models/client'),
    _ = require('lodash');

module.exports = function(router) {

  /**
  * Get Client based on an ID
  */

  router.post("/:id/get", function(req, res) {


      if (req.params.id === "current") {
          return res.json({
              status: true,
              data: {
                  client: ClientModel.getPortableFields(req.user)
              }
          });
      }

    ClientModel.findById(req.params.id, {
      deleted: false
    }).then(function(client) {
      res.json({
        status: true,
        data: {
            client: ClientModel.getPortableFields(client)
        }
      });
    }).catch(function(error) {
      res.json({
        status: false,
        message: error.message,
        data: error
      });
    });

  });
    
  /**
  * Update Client based on an ID with new data
  */

  router.post("/:id/update", function(req, res) {
    var changes = req.body.changes;

    if (_.isEmpty(changes)) {
      return res.json({
        status: false,
        message: "No changes to update client with.",
        data: null
      });
    }

    ClientModel.findById(req.params.id, {
      deleted: false
    }).then(function(client) {
      if (client) {
        client = client.updateWithChanges(changes);
        client.save().then(function(client) {
          res.json({
            status: true,
            message: "Client was updated successfully",
            data: client
          })
        });
      } else {
        res.json({
          status: false,
          message: "No Client matching ID: " + req.params.id,
          data: null
        });
      }
    }).catch(function(error) {
      return res.json({
        status: false,
        message: error.message,
        data: error
      });
    });
  });

};
