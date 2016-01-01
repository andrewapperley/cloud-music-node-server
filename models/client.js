
var mongoose = require('mongoose');
var clientSchema = require('./client-schema');
var _ = require('lodash');

module.exports = function() {

    var client = mongoose.model('Client', clientSchema);

    var _publicProps = ["logo", "name"];

    client.updateWithChanges = function(client, changes) {
        _.forIn(changes, function(value, key) {
            if (_.includes(_publicProps, key)) {
                client[key] = value;
            } else {
                console.log("Web Client attempted to update: " + key + " on Client: " + client._id);
            }
        });
        return client;
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
