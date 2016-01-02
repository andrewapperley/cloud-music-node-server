'use strict';

var React = require('react');
var RouterMixin = require('react-mini-router').RouterMixin;
var navigate = require('react-mini-router').navigate;
var Fluxxor = require('fluxxor');
var MusicUpload = require('./components/upload');

var Music = React.createClass({

    mixins: [RouterMixin, Fluxxor.FluxMixin(React)],

    routes: {
        '/': 'index',
        '/upload': 'upload'
    },

    render: function() {
        return this.renderCurrentRoute();
    },

    index: function() {
        return (
             <div>
                <p>Music Index</p>
             </div>
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
