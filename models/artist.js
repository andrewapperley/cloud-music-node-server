
var mongoose = require('mongoose');
var artistSchema = require('./artist-schema');
var _ = require('lodash');

module.exports = function() {

    var artist = mongoose.model('Artist', artistSchema);

    var _publicProps = ["name", "meta"];

    return artist;

}();
