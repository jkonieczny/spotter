/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var Header = require('./header.jsx');
var User = require('./user.jsx');
var Product = require('./product.jsx');
var Confirmation = require('./confirmation.jsx');

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('UserStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();

		console.log(1, flux.store('UserStore').getState());
		return {
			users: flux.store('UserStore').getState()
		};
	},
    render: function() {
        return (
            <div>
            	<Header />
                <User />
                <Product />
                <Confirmation />
            </div>
        );
    }

});