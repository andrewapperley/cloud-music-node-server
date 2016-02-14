'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var MusicListComponent = require('./music-list-component');
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;

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
            <Grid>
                <Row classname="centered-block">
                    <Col>
                        {bodyContent}
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = List;
