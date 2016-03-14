var Fluxxor = require('fluxxor');
var constants = require('../constants');
var _ = require('lodash');

module.exports = Fluxxor.createStore({
    initialize: function(options) {

        this.loading = false;
        this.error = null;
        this.clients = options.clients || {};
        this.current = options.current || null;

        this.bindActions(
            constants.LOAD_USER, this.onGetUser,
            constants.LOAD_USER_SUCCESS, this.onGetUserSuccess,
            constants.LOAD_USER_FAILURE, this.onGetUserFailure

            //constants.LOAD_USERS, this.onGetUsers,
            //constants.LOAD_USERS_SUCCESS, this.onGetUsersSuccess,
            //constants.LOAD_USERS_FAILURE, this.onGetUsersFailure
        );
    },

    onGetUser: function() {
        this.loading = true;
        this.emit("change");
    },

    onGetUserSuccess: function(payload) {
        this.loading = false;
        this.current = payload.id;
        this.clients[this.current] = payload;
        this.emit("change");
    },

    onGetUserFailure: function(payload) {
        this.loading = false;
        this.error = payload.error;
        this.emit("change");
    },

    getState: function() {
        return {
            loading: this.loading,
            error: this.error,
            current: this.current,
            clients: this.clients
        };
    }
});
