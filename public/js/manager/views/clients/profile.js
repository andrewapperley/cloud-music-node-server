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

    render: function() {

        return (
            <Grid>
                <Row classname="centered-block">
                    <Col>
                        <form className="form-horizontal" action={this.props.client._id+"/update"} method="POST">
                            <FormControls label="ID" value={this.props.client._id} />
                            <Input onChange={this.onInputChanged} type="text" label="Name" name="name" value={this.state.client.name} />
                            <Input onChange={this.onInputChanged} type="text" label="Email" name="email" value={this.state.client.email} />
                            <ButtonInput disabled={!this.state.changed} type="submit" value="Update" bsSize="medium" />
                        </form>
                    </Col>
                </Row>
            </Grid>
        );
    }
});

module.exports = Profile;
