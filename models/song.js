
var mongoose = require('mongoose');
var songSchema = require('./song-schema');
var _ = require('lodash');

module.exports = function() {

    var song = mongoose.model('Song', songSchema);

    var _publicProps = ["name", "album", "genre", "track"];

    return song;

}();
