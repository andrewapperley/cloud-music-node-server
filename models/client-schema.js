
var Schema = require('mongoose').Schema,
    bcrypt = require('bcrypt'),
    crypto = require('../lib/crypto');

var _schema = {
    logo: {type: Schema.Types.ObjectId, ref: "Media"},
    name: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    suspended: {type: Boolean, default: false},
    activated: {type: Boolean, default: false}
};

module.exports = function() {

    var schema = new Schema(_schema);

    /**
     * Attach any static functions here
     */

    schema.pre('save', function (next) {
        var client = this;

        console.log(client);
        //If the password has not been modified in this save operation, leave it alone (So we don't double hash it)
        if (!client.isModified('password')) {
            next();
            return;
        }
        console.log(bcrypt);
        //Encrypt it using bCrypt. Using the Sync method instead of Async to keep the code simple.
        bcrypt.hash(client.password, crypto.getCryptLevel(), function (error, hash) {

            if (error) {
                console.log(error);
                next();
                return;
            }
            //Replace the plaintext pw with the Hash+Salted pw;
            client.password = hash;
            console.log(client);
            //Continue with the save operation
            next();
        });


    });

    /**
     * Helper function that takes a plaintext password and compares it against the user's hashed password.
     * @param plainText
     * @param callback function(error, matched)
     */
    schema.methods.passwordMatches = function (plainText, callback) {
        var client = this;
        bcrypt.compare(plainText, client.password, function (error, matched) {
            callback(error, matched);
        });
    };

    return schema;
}();
