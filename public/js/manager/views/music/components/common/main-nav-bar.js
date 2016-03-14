'use strict';

var React = require('react');
var _ = require('lodash');
var Fluxxor = require('fluxxor');
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Navbar = require('react-bootstrap').Navbar;
var Nav = require('react-bootstrap').Nav;
var NavItem = require('react-bootstrap').NavItem;
var NavDropdown = require('react-bootstrap').NavDropdown;
var MenuItem = require('react-bootstrap').MenuItem;
var NavBrand = require('react-bootstrap').NavBrand;

/*Get current client from Clients Store and use it here to get Name and ID*/

var MainNavBar = React.createClass({

    mixins: [Fluxxor.FluxMixin(React), StoreWatchMixin('ClientStore')],

    getInitialState: function() {
        return {}
    },

    getStateFromFlux: function() {
        var clientStoreState = this.getFlux().store('ClientStore').getState();
        return {
            client: clientStoreState.clients[clientStoreState.current] || {}
        }
    },

    render: function() {
        return (
            <Navbar toggleNavKey={0}>
                <a href="/application/"><NavBrand>Cloud Music</NavBrand></a>
                <Nav right eventKey={0}>
                    <NavItem eventKey={2} href="/application/music/upload">Upload</NavItem>
                    <NavItem eventKey={1} href="/application/music/list">Music List</NavItem>
                    <NavDropdown eventKey={3} title="Account" id="collapsible-navbar-dropdown">
                        <MenuItem href={"/application/clients/"+this.state.client._id} eventKey="1">{this.state.client.name}</MenuItem>
                        <MenuItem divider />
                        <MenuItem href="/logout" eventKey="4">Logout</MenuItem>
                    </NavDropdown>
                </Nav>
            </Navbar>

        );
    }
});

module.exports = MainNavBar;