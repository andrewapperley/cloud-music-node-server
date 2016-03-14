var constants = require('../constants');
var clientService = require('../services/client-service');

module.exports = {

    loadUser : function() {
        var _this = this;
        this.dispatch(constants.LOAD_USER);
        clientService.getClient(null, function(err, response) {
            err = err || response.error;
            if (err) {
                return _this.dispatch(constants.LOAD_USER_FAILURE, err);
            }
            _this.dispatch(constants.LOAD_USER_SUCCESS, response.data.client);
        });
    }

};
