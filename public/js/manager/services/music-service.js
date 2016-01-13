var request = require('superagent');

module.exports = {

    uploadMusic: function(files, callback) {
        var req = request.post('/application/music/upload');
        files.forEach((file)=> {
            req.attach(file.name, file, file.name+".mp3");
        });
        req.set('Accept', 'application/json')
            .end(function(err, res){
                callback(err, res.body);
            });

    },

    listMusic: function(callback) {
        var req = request.post('/application/music/list');
        req.set('Accept', 'application/json')
            .end(function(err, res){
                callback(err, res.body);
            });

    }

};
