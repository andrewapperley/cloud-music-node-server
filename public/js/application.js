
var Music = require('./manager/views/music/index');
var MainNavBar = require('./manager/views/music/components/common/main-nav-bar');
var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var ClientStore = require('./manager/stores/client-store');
var MusicStore = require('./manager/stores/music-store');
window.$ = window.jQuery = require('jquery');

var Application = React.createClass({

    mixins: [RouterMixin, FluxMixin, StoreWatchMixin('ClientStore')],

    getStateFromFlux: function() {
        return {
            client: this.getFlux().store('ClientStore').getState()
        };
    },

    routes: {
        '/': 'index',
        '/music/:nested': 'music',
        '/music': 'music'
    },

    render: function() {
        return (
            <div>
                <MainNavBar />
                {this.renderCurrentRoute()}
            </div>
        );
    },

    index: function() {
        return (
            <div>
                <p>Application Index</p>
            </div>
        );
    },

    music: function() {
        return (
            <Music path={this.state.path} root="/application/music"/>
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
    App({flux: flux, history: true, root: "/application"}),
    document.getElementById('application')
);
