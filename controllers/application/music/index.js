'use strict';

var ProcessUpload = require('../../../lib/process-upload');
var _ = require('lodash');

module.exports = function (router) {

    router.post('/upload', function(req, res) {

        var files = req.files;

        if (files && !_.isEmpty(files)) {
            ProcessUpload(files)
                .then(function(music) {
                    return res.json({
                        data: {
                            music: music
                        },
                        error: null,
                        status: "success"
                    });
                })
                .catch(function(error) {
                    return res.json({
                        data: null,
                        error: error,
                        status: "failure"
                    });
                });
        }
    });

};
