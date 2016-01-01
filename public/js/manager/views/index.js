'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');

var Index = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    render: function() {
        return (
            <div>
                <p>Index</p>
            </div>
        );
    }
});

module.exports = Index;
