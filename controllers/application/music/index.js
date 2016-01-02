'use strict';

var MusicModel = require('../../../models/viewModels/music');


module.exports = function (router) {

    router.post('/upload', function(req, res) {

        var files = req.body.data;
        console.log(files);

        return res.json({
            data: {
                music: {}
            },
            error: null,
            status: "success"
        });
    });

};
