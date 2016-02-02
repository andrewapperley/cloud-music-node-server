'use strict';

var React = require('react');
var _ = require('lodash');

var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;

var MusicListComponent = React.createClass({

    render: function() {

        var music = this.props.music;
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