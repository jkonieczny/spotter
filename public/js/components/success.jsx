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

		var totalPrice, commisionPrice;

		var selectedProducts = [];
		if (this.state.selectedProducts.length > 0) {
			totalPrice 		= 0;
			commisionPrice 	= 0;

			this.state.selectedProducts.forEach(function(product) {
				totalPrice 		+= product.price;
				commisionPrice 	+= product.price * 0.1;
				selectedProducts.push(
					(<Item key={product.id} item={product} />)
				);
			});

			commisionPrice 	= (Math.round(commisionPrice * 100) / 100).toFixed(2);
			totalPrice 		= totalPrice.toFixed(2);
		}

        return (
            <div className="page page_success">
            	<Avatar person={this.state.selectedUser} />
                <div>
                	<p>Great! We’ve sent these products by email to {this.state.selectedUser.fname}. When he buys them, you’ll earn the reward shown below</p>
                </div>
                <div>
                	{selectedProducts}
                </div>
                <div className="product_price right">
	                <p></p>
                	<h2>Total Price:<span>&pound;{totalPrice}</span></h2>
                	<h2>You would earn:<span>&pound;{commisionPrice}</span></h2>
                </div>
                <div className="right">
                	<p></p>
                	<p><a href="#" onClick={this.viewEmail}>View email</a></p>
                </div>
            </div>
        );
    },
    viewEmail: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'email'
    	});
    }
});