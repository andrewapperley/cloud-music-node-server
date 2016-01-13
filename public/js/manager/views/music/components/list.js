'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var _ = require('lodash');

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
            var songs = [];
            musicStore.music.songs.map(function(song) {
                songs.push(
                    <li key={song._id}>{song.name} | {song.artist.name} | {song.album.name}</li>
                );
            });
            bodyContent = <ul>
                {songs}
                </ul>;
        } else {
            bodyContent = <p>No Music</p>;
        }

        return (
            <div>
                <p>Music List</p>
                {bodyContent}
            </div>
        );
    }
});

module.exports = List;
