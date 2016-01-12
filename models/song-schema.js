
var Schema = require('mongoose').Schema;

var _schema = {
    owner: {type: Schema.Types.ObjectId, ref: "Client", required: true, index: true},
    album: {type: Schema.Types.ObjectId, ref: "Album", required: true, index: true},
    artist: {type: Schema.Types.ObjectId, ref: "Artist", required: true, index: true},
    name: {type: String, required: true, index: true},
    genre: {type: Array},
    track: {type: Number}
};

module.exports = function() {

    var schema = new Schema(_schema);

    /**
     * Attach any static functions here
     */

    return schema;
}();
