'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var _ = require('lodash');
var MusicListComponent = require('./music-list-component');

var List = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    componentDidMount: function() {
        this.getFlux().actions.MusicActions.listMusic();
    },

    render: function() {
        var musicStore = this.props.musicStore;
        var bodyContent;
        if (musicStore.loading) {
            bodyContent= <p>Loading...</p>;
        } else if (Object.keys(musicStore.music).length > 0) {
            bodyContent = <MusicListComponent music={musicStore.music} />
        } else {
            bodyContent = <p>No Music</p>;
        }

        return (
            <div>
                {bodyContent}
            </div>
        );
    }
});

module.exports = List;
