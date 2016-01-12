'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var List = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    render: function() {
        return (
            <div>
                <p>Music List</p>

            </div>
        );
    }
});

module.exports = List;
