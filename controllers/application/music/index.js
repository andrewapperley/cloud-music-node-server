'use strict';

var ProcessUpload = require('../../../lib/process-upload');
var _ = require('lodash');
var Promise = require('bluebird');
var AlbumModel = require('../../../models/album');
var ArtistModel = require('../../../models/artist');
var SongModel = require('../../../models/song');

module.exports = function (router) {

    router.post('/upload', function(req, res) {

        var files = req.files;
        var user = req.user;
        if (files && !_.isEmpty(files)) {
            ProcessUpload(files, user)
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

    router.get('/getMusic', function(req, res) {
        var promises = [
            SongModel.find({owner: req.user._id}),
            AlbumModel.find({owner: req.user._id}),
            ArtistModel.find({owner: req.user._id})
        ];
        Promise.all(promises)
            .spread(function(songs, albums, artists) {

                var _songs = [];
                songs.map(function(song) {
                    _songs.push(song.toObject());
                });
                var _albums = [];
                albums.map(function(album) {
                    _albums.push(album.toObject());
                });
                var _artists = [];
                artists.map(function(artist) {
                    _artists.push(artist.toObject());
                });

                return res.json({
                    data: {
                        music: {
                            songs: _songs,
                            albums: _albums,
                            artists: _artists
                        }
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
    });

};
