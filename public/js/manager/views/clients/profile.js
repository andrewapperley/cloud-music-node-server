'use strict';

var React = require('react');
var Fluxxor = require('fluxxor');
var Grid = require('react-bootstrap').Grid;
var Col = require('react-bootstrap').Col;
var Row = require('react-bootstrap').Row;
var Input = require('react-bootstrap').Input;
var ButtonInput = require('react-bootstrap').ButtonInput;
var FormControls = require('react-bootstrap').FormControls.Static;

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
        var updateLoader = <span>Update</span>;
        if (this.props.client.updating) {
            updateLoader = <span>Updating <span className="loading glyphicon glyphicon-refresh"/></span>;
        } else if (this.props.client.updated) {
            updateLoader = <span>Updated <span className="glyphicon glyphicon-ok"/></span>;
        }
        return (
            <Grid>
                <Row classname="centered-block">
                    <Col>
                        <form className="form-horizontal" onSubmit={this.onSubmit} method="POST">
                            <FormControls label="ID" value={this.props.client._id} />
                            <Input onChange={this.onInputChanged} type="text" label="Name" name="name" value={this.state.client.name} />
                            <Input onChange={this.onInputChanged} type="text" label="Email" name="email" value={this.state.client.email} />
                            <button disabled={!this.state.changed} type="submit" className="btn btn-default">{updateLoader}</button>
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Profile;
