
var Schema = require('mongoose').Schema;

var _schema = {
    owner: {type: Schema.Types.ObjectId, ref: "Client", index: true},
    name: {type: String, required: true, unique: true, index: true},
    image: {type: String}
};

module.exports = function() {

    var schema = new Schema(_schema);

    /**
     * Attach any static functions here
     */

    return schema;
}();
