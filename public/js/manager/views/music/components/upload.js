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
        this.state.files.push(files);
        this.setState({
            files: _.flatten(this.state.files),
            showError: false
        });
        this.getFlux().actions.MusicActions.postMusic(files);
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
        return (
        <Grid>
            <Row classname="centered-block">
                <Col>
                    <p>Upload</p>
                    <Dropzone disableClick={true} onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected} accept=".mp3,.m4a">
                        <div>Try dropping some files here, or click to select files to upload.</div>
                    </Dropzone>
                    {this.state.showError ?
                        <Alert bsStyle="danger" onDismiss={this.handleErrorDismiss} dismissAfter={2000}>
                            <h4>Oh snap! An error occurred!</h4>
                            <p>Only MP3 files are accepted.</p>
                        </Alert>
                    : null}
                    {this.state.files.length > 0 ? <div>
                        <h2>Uploading {this.state.files.length} files...</h2>
                        <ul>
                            {this.state.files.map(function(file) {
                                return <li key={file.name}>{file.name}</li>
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
