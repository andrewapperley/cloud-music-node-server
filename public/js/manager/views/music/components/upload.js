'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var Dropzone = require('react-dropzone');

var Upload = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    onDrop: function(files) {
        this.getFlux().actions.MusicActions.postMusic(files);
    },

    render: function() {
        return (
            <div>
                <p>Upload</p>
                <Dropzone onDrop={this.onDrop} accept="audio/mpeg3">
                    <div>Try dropping some files here, or click to select files to upload.</div>
                </Dropzone>
            </div>
        );
    }
});

module.exports = Upload;
