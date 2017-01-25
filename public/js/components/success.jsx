/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Item 	= require('./item.jsx');
var Avatar	= require('./avatar.jsx');

module.exports = React.createClass({
	displayName: 'success.jsx',
	mixins: [FluxMixin, StoreWatchMixin('ClientStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();
		return {
			selectedUser: flux.store('ClientStore').getState().client,
			selectedProducts: flux.store('ProductStore').getState().selectedProducts
		};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {

        return (
            <div className="page page_success">
                <h2>Awesome!</h2>
                <p>Your recommendations have been sent to { this.state.selectedUser.fname }</p>
                <p>As soon as { this.state.selectedUser.fname } makes a purchase, we'll let you know how much you've earned!
                </p>
                <button onClick={ this.home }>Back to home</button>
            </div>
        );
    },
    home: function() {
        this.getFlux().actions.page.update({
            page: 'home'
        });
    }
});