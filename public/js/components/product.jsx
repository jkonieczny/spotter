/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Avatar		= require('./avatar.jsx');
var Item		= require('./item.jsx');
var ItemSelect	= require('./itemSelect.jsx');

module.exports = React.createClass({
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

		var totalPrice, commisionPrice, proceedButton, recommendText;

		var selectedProducts = [];
		if (this.state.selectedProducts.length > 0) {
			totalPrice		= 0;
			commisionPrice	= 0;

			this.state.selectedProducts.forEach(function(product) {
				totalPrice		+= product.price;
				commisionPrice	+= product.price * 0.1;
				selectedProducts.push(
					(<Item key={product.id} item={product} />)
				);
			});

			totalPrice 		= 	(
									<div className="product_price right">
										<h2>Total Price: 	<span>&pound;{totalPrice.toFixed(2)}</span></h2>
										<h2>You would earn: <span>&pound;{(Math.round(commisionPrice * 100) / 100).toFixed(2)}</span></h2>
									</div>
								);

			proceedButton 	= (<button type="submit" onClick={this.proceed}>Proceed</button>);
			recommendText 	= (<h3>Recommend another product?</h3>);
		}

        return (
            <div className="page page_product">
            	<Avatar person={this.state.selectedUser} />
                <p className="center">What would you like to recommend to {this.state.selectedUser.fname}?</p>
                <div className="item_list">
                	{ selectedProducts }
                </div>
                { totalPrice }
                { recommendText }
                <ItemSelect />
                { proceedButton }
            </div>
        );
    },
    proceed: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'confirmation'
    	});
    }

});