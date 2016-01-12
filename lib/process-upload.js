'use strict';

var fs = require('fs-extended');
var mm = require('musicmetadata');
var _ = require('lodash');
var Promise = require('bluebird');

var AlbumModel = require('../models/album');
var ArtistModel = require('../models/artist');
var SongModel = require('../models/song');

module.exports = function(files, user) {

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
                    ArtistModel.findOneAndUpdate({name: metadata.artist[0]}, {name: metadata.artist[0], owner: user._id}, {upsert: true, new: true}, function(error, artist) {
                        if (error) return _reject(error);

                        if (artist.isNew) {
                            var _artist = artist.toObject();
                            _artist._id = _artist._id.toString();
                            music.artists.push(_artist);
                        }

                        AlbumModel.findOneAndUpdate({name: metadata.album, artist: artist._id}, {name: metadata.album, artist: artist._id, owner: user._id}, {upsert: true, new: true}, function(error, album) {
                            if(error) return _reject(error);

                            return new Promise(function(__resolve, __reject) {
                                var _album = album.toObject();
                                _album._id = _album._id.toString();
                                music.albums.push(_album);

                                if (metadata.picture.length > 0) {
                                    var image = metadata.picture[0].data;
                                    var imagePath = value.path.split('media')[0] + "images/" + album._id;
                                    fs.stat(imagePath, function(error) {

                                        if (error) {
                                            if(error.code === 'ENOENT') {

                                                fs.createFile(imagePath, image, function(error) {
                                                    if (error) return __reject(error);
                                                    return __resolve(album);
                                                });
                                            } else {
                                                return __reject(error);
                                            }
                                        } else {
                                            return __resolve(album);
                                        }
                                    });
                                } else {
                                    __resolve(album);
                                }
                            }).then(function(album) {
                                SongModel.findOneAndUpdate({name: metadata.title, album: album._id, artist: artist._id}, {name: metadata.title, album: album._id, artist: artist._id, genre: metadata.genre, track: metadata.track.no, owner: user._id}, {upsert: true, new: true}, function(error, song) {
                                    if (error) return _reject(error);

                                    if (song.isNew) {
                                        var _song = song.toObject();
                                        _song._id = _song._id.toString();
                                        music.songs.push(_song);
                                    }

                                    _resolve();
                                });
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