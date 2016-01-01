
var Index = require('./manager/views/index');
var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ClientStore = require('./manager/stores/client-store');
var MusicStore = require('./manager/stores/music-store');

var Application = React.createClass({

    mixins: [RouterMixin, FluxMixin, StoreWatchMixin('MusicStore'), StoreWatchMixin('ClientStore')],

    getStateFromFlux: function() {
        return this.getFlux().store('ClientStore').getState();
    },

    routes: {
        '/': 'index'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    index: function() {
        return (
            <Index />
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

var App = React.createFactory(Application);

var flux = new Fluxxor.Flux({
    'MusicStore': new MusicStore(),
    'ClientStore': new ClientStore()
}, {
    'MusicActions': require('./manager/actions/music-actions'),
    'ClientActions': require('./manager/actions/client-actions')
});

React.render(
    App({flux: flux}),
    document.getElementById('application')
);
