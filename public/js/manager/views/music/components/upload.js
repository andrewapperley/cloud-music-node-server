'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var _ = require('lodash');
var Dropzone = require('react-dropzone');
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Alert = require('react-bootstrap').Alert;

var Upload = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    getInitialState: function() {
        return {
            files: []
        };
    },

    onDropAccepted: function(files, e) {
        var now = new Date().getTime();
        this.state.files.push(_.map(files, function(file){file.id = now; return file;}));
        this.setState({
            files: _.flatten(this.state.files),
            showError: false
        });
        this.getFlux().actions.MusicActions.postMusic(files, now);
    },

    onDropRejected: function(files, e) {
        this.setState({
            showError: true
        });
    },

    handleErrorDismiss: function() {
        this.setState({
            showError: false
        });
    },

    render: function() {
        var musicStore = this.props.musicStore;
        return (
        <Grid>
            <Row classname="centered-block">
                <Col>
                    <p>Upload</p>
                    <Dropzone className="dropzone-upload" activeClassName="dropzone-upload-active" rejectClassName="dropzone-upload-reject" disableClick={true} onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected} accept="audio/mp3,audio/x-m4a,.mp3,.m4a">
                        <div>
                            <p>Drop .mp3 files here.</p>
                        </div>
                    </Dropzone>
                    {this.state.showError ?
                        <Alert bsStyle="danger" onDismiss={this.handleErrorDismiss} dismissAfter={2000}>
                            <h4>Oh snap! An error occurred!</h4>
                            <p>Only MP3 files are accepted.</p>
                        </Alert>
                    : null}
                    {this.state.files.length > 0 ? <div>
                        <ul>
                            {this.state.files.map(function(file) {
                                return <li key={file.name}>{file.name} Progress: {parseInt(musicStore.progress[file.id])}%</li>
                            })}
                        </ul>
                    </div> : null}
                </Col>
            </Row>
        </Grid>
        );
    }
});

module.exports = Upload;
