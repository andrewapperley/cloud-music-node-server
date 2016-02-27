var request = require('superagent');

module.exports = {
    getClient: function (id, callback) {

        request
            .post('/application/clients/')
            .set('Accept', 'application/json')
            .end(function(error, res) {
                console.log(res);
            });

    }
};
