'use strict';

var React = require('react');
var _ = require('lodash');

var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;

var MusicListComponent = React.createClass({

    getInitialState: function() {
        return {
            sort: "Song",
            music: []
        };
    },

    setSort: function(e, eventKey, music) {
        var sortProperty;
        switch (eventKey) {
            case "Artist":
                sortProperty = "artist.name";
                break;
            case "Album":
                sortProperty = "album.name";
                break;
            case "Genre":
                sortProperty = "genre";
                break;
            case "Song":
            default:
                sortProperty = "name";
                break;
        }
        var _m = music ? music : this.state.music;
        _m.songs = _.sortBy(_m.songs, sortProperty);
        if (!music) {
            this.setState({ sort: eventKey, music: _m});
        } else {
            return _m;
        }
    },

    render: function() {

        if (this.props) {
            if (this.props.music.length !== this.state.music.length) {
                this.state.music = this.setSort(null, null, this.props.music);
            }
        }

        var sort = this.state.sort;
        var music = this.state.music;
        var songs = [];
        music.songs.map(function(song) {
            songs.push(
                <tr key={song._id}>
                    <th>{song.name}</th>
                    <td>{song.artist.name}</td>
                    <td>{song.album.name}</td>
                    <td>{song.genre}</td>
                </tr>
            );
        });

        return (
            <div>
                <DropdownButton bsStyle="default"  title={this.state.sort} id={`sort-dropdown`}>
                    <MenuItem onSelect={this.setSort} active={sort === "Song"} eventKey="Song">Song</MenuItem>
                    <MenuItem onSelect={this.setSort} active={sort === "Artist"} eventKey="Artist">Artist</MenuItem>
                    <MenuItem onSelect={this.setSort} active={sort === "Album"} eventKey="Album">Album</MenuItem>
                    <MenuItem onSelect={this.setSort} active={sort === "Genre"} eventKey="Genre">Genre</MenuItem>
                </DropdownButton>
                <table className="table table-hover table-striped">
                    <thead>
                    <tr>
                        <th>Song</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Genres</th>
                    </tr>
                    </thead>
                    <tbody>
                    {songs}
                    </tbody>
                </table>
                <div className="clearfix"></div>
            </div>
        );
    }

});

module.exports = MusicListComponent;