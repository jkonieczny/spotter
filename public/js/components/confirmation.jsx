/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Avatar	= require('./avatar.jsx');
var Item	= require('./item.jsx');

module.exports = React.createClass({
	displayName: 'confirmation.jsx',
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

		var totalPrice, totalSaving, commisionPrice, proceedButton, saving;

		var selectedProducts = [];
		if (this.state.selectedProducts.length > 0) {
			totalPrice		= 0;
			commisionPrice	= 0;
            totalSaving     = 0;

			this.state.selectedProducts.forEach(function(product) {
				totalPrice		+= product.price;
				commisionPrice	+= product.expected_commission;
                totalSaving     += (product.original_price - product.price);

				selectedProducts.push(
					(<Item key={product.id} item={product} />)
				);
			});

			commisionPrice 	= (Math.round(commisionPrice * 100) / 100).toFixed(2);
			totalPrice 		= totalPrice.toFixed(2);

			proceedButton = (<button type="submit" onClick={this.proceed}>Proceed</button>);

            if (totalSaving > 0) {
                saving = (
                    <h2>
                        Saving: <span>&pound;{totalSaving.toFixed(2)}</span>
                    </h2>
                );  
            }
		}

        return (
            <div className="page page_product">
                <Avatar person={this.state.selectedUser} />
                <div className="center">
                	<p>Your recommendations for {this.state.selectedUser.fname}</p>
                </div>
                <div className="item_list">
                	{selectedProducts}
                </div>
                <p/>
                <div className="product_price right">
                	<h2>Total Price:<span>&pound;{totalPrice}</span></h2>
                    {saving}
                	<h2>You would earn:<span>&pound;{commisionPrice}</span></h2>
                	<p></p>
                </div>
                <div className="right hide">
                	<p></p>
                	<p><a href="#" onClick={this.viewEmail}>View email</a></p>
                </div>
                <div>
                	<p className="center">
                	Click below to send these recommendations to {this.state.selectedUser.fname}. If {this.state.selectedUser.fname} buys the products you've selected, you will earn the reward shown above</p>
                	<button onClick={this.sendEmail}>Confirm & send recommendations by email</button>
                </div>
            </div>
        );
    },
    viewEmail: function(e) {
    	e.preventDefault();
    	this.getFlux().actions.page.update({
    		page: 'email'
    	});
    },
    sendEmail: function(e) {
    	e.preventDefault();
        this.getFlux().actions.email.send();

    	this.getFlux().actions.page.update({
    		page: 'success'
    	});
    }

});