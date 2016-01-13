var Fluxxor = require('fluxxor');
var constants = require('../constants');
var _ = require('lodash');

module.exports = Fluxxor.createStore({
    initialize: function(options) {

        this.loading = false;
        this.error = null;
        this.music = options.music || {

            };

        this.bindActions(
            constants.UPLOAD_MUSIC, this.onUploadMusic,
            constants.UPLOAD_MUSIC_SUCCESS, this.onUploadMusicSuccess,
            constants.UPLOAD_MUSIC_FAILURE, this.onUploadMusicFailure,

            constants.LIST_MUSIC, this.onGetMusicList,
            constants.LIST_MUSIC_SUCCESS, this.onGetMusicListSuccess,
            constants.LIST_MUSIC_FAILURE, this.onGetMusicListFailure
        );
    },

    onUploadMusic: function() {
        this.loading = true;
        this.emit("change");
    },

    onUploadMusicSuccess: function(payload) {
        this.loading = false;
        this.emit("change");
    },

    onUploadMusicFailure: function(payload) {
        this.loading = false;
        this.error = payload.error;
        this.emit("change");

    },

    onGetMusicList: function() {
        this.loading = true;
        this.emit("change");
    },

    onGetMusicListSuccess: function(payload) {
        this.loading = false;
        /**
         * #TODO Sort through and update the records if they already exist or add if new.
         * #TODO They will only be delta changes so overwriting all the music won't work.
         */
        this.music = payload;
        this.emit("change");
    },

    onGetMusicListFailure: function(payload) {
        this.loading = false;
        this.error = payload.error;
        this.emit("change");
    },

    getState: function() {
        return {
            loading: this.loading,
            music: this.music,
            error: this.error
        };
    }
});
