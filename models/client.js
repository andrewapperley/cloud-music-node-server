
var mongoose = require('mongoose');
var clientSchema = require('./client-schema');
var _ = require('lodash');

module.exports = function() {

    var client = mongoose.model('Client', clientSchema);

    var _publicProps = ["email", "name", "_id"];
    var _updatableProps = ["email", "name", "suspended", "activated"];

    client.getPortableFields = function getPortableFields(client) {
        var _client = {};
        _.forEach(_publicProps, function(prop) {
           _client[prop] = client[prop];
        });
        return _client;
    };

    client.updateWithChanges = function(client, changes) {
        _.forIn(changes, function(value, key) {
            if (_.includes(_updatableProps, key)) {
                client[key] = value;
            } else {
                console.log("Web Client attempted to update: " + key + " on Client: " + client._id);
            }
        });
    };

    client.validateName = function(name) {
        return client.findOne({
            name: name
        }).select("_id");
    };

    client.serialize = function (client, done) {
        done(null, client.id);
    };

    client.deserialize = function (id, done) {
        client.findOne({
            _id: id
        }, function (err, client) {
            done(null, client);
        });
    };

    return client;

}();
