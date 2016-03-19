'use strict';

var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var Fluxxor = require('fluxxor');
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Profile = require('./profile');

var Clients = React.createClass({

    mixins: [RouterMixin, Fluxxor.FluxMixin(React), StoreWatchMixin('ClientStore')],

    routes: {
        '/:id': 'profile',
        '/list': 'list'
    },


    getInitialState: function() {
        return {}
    },

    getStateFromFlux: function() {
        var clientStoreState = this.getFlux().store('ClientStore').getState();
        return {
            client: clientStoreState.clients[clientStoreState.current] || {},
            clients: clientStoreState.clients || []
        }
    },

    render: function() {
        this.state.path = this.props.path;
        return this.renderCurrentRoute();
    },

    profile: function() {
        return (
            <Profile client={this.state.client} />
        );
    },

    list: function() {
        return (
            <div>
                <p>Clients List</p>
            </div>
        );
    },

    notFound: function(path) {
        return (
            <div>
                <h2>404 Not Found</h2>
                <p>{path} is not defined</p>
            </div>
        );
    }
});

module.exports = Clients;
