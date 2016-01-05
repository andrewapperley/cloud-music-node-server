'use strict';

var fs = require('fs');
var mm = require('musicmetadata');
var _ = require('lodash');
var Promise = require('bluebird');

var AlbumModel = require('../models/album');
var ArtistModel = require('../models/artist');
var SongModel = require('../models/song');

module.exports = function(files) {

    return new Promise(function(resolve, reject) {
        var promises = [];
        var music = {
            artists: [],
            albums: [],
            songs: []
        };
        _.forIn(files, function(value, key) {
            promises.push(new Promise(function(_resolve, _reject) {
                mm(fs.createReadStream(value.path), function (err, metadata) {
                    if (err) return _reject(err);
                    console.log(metadata);
                    ArtistModel.findOrCreate({name: metadata.artist[0]}, function(error, artist, created) {
                        if (error) return _reject(error);
                        var _artist = artist.toObject();
                        _artist._id = _artist._id.toString();
                        music.artists.push(_artist);
                        AlbumModel.findOrCreate({name: metadata.album, artist: artist._id}, function(error, album, created) {
                            if(error && !created) return _reject(error);
                            var _album = album.toObject();
                            _album._id = _album._id.toString();
                            music.albums.push(_album);
                            SongModel.findOrCreate({name: metadata.title, album: album._id, genre: metadata.genre, track: metadata.track.no}, function(error, song, created) {
                                if (error && !created) return _reject(error);
                                var _song = song.toObject();
                                _song._id = _song._id.toString();
                                music.songs.push(_song);
                                _resolve();
                            });
                        });
                    });
                });
            }));
        });
        return Promise.all(promises)
            .then(function() {
                _.forEach(music, function(value, key) {
                    music[key] = _.uniq(value, "_id");
                });
                resolve(music);
            });
    });

};