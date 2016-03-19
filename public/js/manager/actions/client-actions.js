var constants = require('../constants');
var clientService = require('../services/client-service');

module.exports = {

    loadUser : function(id) {
        var _this = this;
        this.dispatch(constants.LOAD_USER);
        clientService.getClient(id, function(err, response) {
            err = err || response.error;
            if (err) {
                return _this.dispatch(constants.LOAD_USER_FAILURE, err);
            }
            _this.dispatch(constants.LOAD_USER_SUCCESS, response.data.client);
        });
    },
    updateUser : function(id, changes) {
        var _this = this;
        this.dispatch(constants.UPDATE_USER, id);
        clientService.updateClient(id, changes, function(err, response) {
            err = err || response.error;
            if (err) {
                return _this.dispatch(constants.UPDATE_USER_FAILURE, err);
            }
            _this.dispatch(constants.UPDATE_USER_SUCCESS, response.data.client);
        });
    }

};