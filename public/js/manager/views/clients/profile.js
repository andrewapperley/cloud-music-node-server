'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var FormControls = require('react-bootstrap').FormControls.Static;
var Glyphicon = require('react-bootstrap').Glyphicon;

var Profile = React.createClass({

    mixins: [Fluxxor.FluxMixin(React)],

    getInitialState: function() {
        return {
            changed: false,
            client: {}
        };
    },

    componentWillReceiveProps: function(props) {
        this.setState({
            client: props.client
        });
    },

    componentDidMount: function() {
        this.setState({
            client: this.props.client
        });
    },

    onInputChanged: function(e) {
        var change = this.state;
        change.changed = true;
        change.client[e.target.name] = e.target.value;
        this.setState(change);
    },

    onSubmit: function(e) {
        e.preventDefault();
        var formData = new FormData(e.target);
        this.getFlux().actions.ClientActions.updateUser(this.props.client._id, formData);
    },

    render: function() {
        var updatingContent = null;
        if (this.props.client.updating) {
            updatingContent = <Glyphicon className="loading" glyph="refresh" />;
        } else if (this.props.client.updated) {
            updatingContent = <Glyphicon glyph="ok" />;
        }
        return (
            <Grid>
                <Row classname="centered-block">
                    <Col>
                        <form className="form-horizontal" onSubmit={this.onSubmit} method="POST">
                            <FormControls label="ID" value={this.props.client._id} />
                            <Input onChange={this.onInputChanged} type="text" label="Name" name="name" value={this.state.client.name} />
                            <Input onChange={this.onInputChanged} type="text" label="Email" name="email" value={this.state.client.email} />
                            <ButtonInput disabled={!this.state.changed} type="submit" value="Update" bsSize="medium" />
                            {updatingContent}
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Profile;
