var constants = require('../constants');
var musicService = require('../services/music-service');

module.exports = {

    postMusic : function(files) {
        var _this = this;
        this.dispatch(constants.UPLOAD_MUSIC);
        musicService.uploadMusic(files, function(err, response) {
            err = err || response.error;
            if (err) {
                return _this.dispatch(constants.UPLOAD_MUSIC_FAILURE, err);
            }
            _this.dispatch(constants.UPLOAD_MUSIC_SUCCESS, response.data.music);
        });
    },

    listMusic : function() {
        var _this = this;
        this.dispatch(constants.LIST_MUSIC);
        musicService.listMusic(function(err, response) {
            err = err || response.error;
            if (err) {
                return _this.dispatch(constants.LIST_MUSIC_FAILURE, err);
            }
            _this.dispatch(constants.LIST_MUSIC_SUCCESS, response.data.music);
        });
    }

};