var request = require('superagent');

module.exports = {
    getClient: function (id, callback) {
        id = id || "current";
        request
            .post('/application/clients/'+id+"/get")
            .set('Accept', 'application/json')
            .end(function(error, res) {
                callback(error, res.body);
            });

    }
};
