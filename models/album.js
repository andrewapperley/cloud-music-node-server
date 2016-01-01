
var mongoose = require('mongoose');
var albumSchema = require('./album-schema');
var _ = require('lodash');

module.exports = function() {

    var album = mongoose.model('Album', albumSchema);

    var _publicProps = ["name", "meta", "artist"];

    return album;

}();
