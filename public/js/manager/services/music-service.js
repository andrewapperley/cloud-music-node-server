var request = require('superagent');

module.exports = {

    uploadMusic: function(files, callback) {
        request
            .post('/application/music/upload')
            .send({data: files, _csrf: window.csrf})
            .set('Accept', 'application/json')
            .end(function(err, res){
                callback(err, res.body);
            });
    }

};
