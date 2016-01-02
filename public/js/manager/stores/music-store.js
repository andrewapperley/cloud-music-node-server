var Fluxxor = require('fluxxor');
var constants = require('../constants');
var _ = require('lodash');

module.exports = Fluxxor.createStore({
    initialize: function(options) {

        this.loading = false;
        this.error = null;
        this.music = options.music || {
                artists: [],
                albums: [],
                songs: []
            };

        this.bindActions(
            constants.UPLOAD_MUSIC, this.onUploadMusic,
            constants.UPLOAD_MUSIC_SUCCESS, this.onUploadMusicSuccess,
            constants.UPLOAD_MUSIC_FAILURE, this.onUploadMusicFailure
        );
    },

    onUploadMusic: function() {
        this.loading = true;
        this.emit("change");
    },

    onUploadMusicSuccess: function(payload) {
        var _this = this;
        _this.loading = false;
        console.log(payload);
    },

    onUploadMusicFailure: function(payload) {
        this.loading = false;
        this.emit("change");
        console.log(payload);
    },

    getState: function() {
        return {
            loading: this.loading,
            music: this.music,
            error: this.error
        };
    }
});
