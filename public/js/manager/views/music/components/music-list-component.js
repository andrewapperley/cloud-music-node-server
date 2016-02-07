'use strict';

var React = require('react');
var _ = require('lodash');

var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var DropdownButton = require('react-bootstrap').DropdownButton;
var MenuItem = require('react-bootstrap').MenuItem;

var MusicListComponent = React.createClass({

    getInitialState: function() {
        return {
            sort: "Song",
            music: []
        };
    },

    setSort: function(e, eventKey) {
        this.setState({ sort: eventKey });
    },

    render: function() {

        if (this.props) {
            this.state.music = this.props.music;
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
        <Grid>
            <Row classname="centered-block">
                <Col md={11}>
                    <DropdownButton bsStyle="default"  title={this.state.sort} id={`sort-dropdown`}>
                        <MenuItem onSelect={this.setSort} active={sort === "Song"} eventKey="Song">Song</MenuItem>
                        <MenuItem onSelect={this.setSort} active={sort === "Artist"} eventKey="Artist">Artist</MenuItem>
                        <MenuItem onSelect={this.setSort} active={sort === "Album"} eventKey="Album">Album</MenuItem>
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
                </Col>
            </Row>
        </Grid>
        );
    }

});

module.exports = MusicListComponent;