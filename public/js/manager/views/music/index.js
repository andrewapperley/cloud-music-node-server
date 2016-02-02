'use strict';

var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var Fluxxor = require('fluxxor');
var MusicUpload = require('./components/upload');
var MusicList = require('./components/list');
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Music = React.createClass({

    mixins: [RouterMixin, Fluxxor.FluxMixin(React), StoreWatchMixin('MusicStore')],

    routes: {
        '/': 'index',
        '/list': 'list',
        '/upload': 'upload'
    },


    getStateFromFlux: function() {
        return {
            musicStore: this.getFlux().store('MusicStore').getState()
        }
    },

    render: function() {
        this.state.path = this.props.path;
        return this.renderCurrentRoute();
    },

    index: function() {
        return (
             <div>
                <p>Music Index</p>
             </div>
        );
    },

    list: function() {
        return (
            <MusicList musicStore={this.state.musicStore}/>
        );
    },

    upload: function() {
        return (
            <MusicUpload />
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

module.exports = Music;
