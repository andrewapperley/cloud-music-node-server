'use strict';

var MusicModel = require('../../../models/viewModels/music');
var fs = require('fs');
var mm = require('musicmetadata');
var _ = require('lodash');

module.exports = function (router) {

    router.post('/upload', function(req, res) {

        var files = req.files;
        console.log(files);

        _.forIn(files, function(value, key) {
            var parser = mm(fs.createReadStream(value.path), function (err, metadata) {
                if (err) throw err;
                console.log(metadata);
            });
        });



        return res.json({
            data: {
                music: {}
            },
            error: null,
            status: "success"
        });
    });

};
