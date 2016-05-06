/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Item = require('./item.jsx');

module.exports = React.createClass({
	displayName: 'confirmation.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		console.log('wat');
		var flux = this.getFlux();
		return {
			selectedUser: flux.store('UserStore').getState().client,
			selectedProducts: flux.store('ProductStore').getState().selectedProducts
		};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
    	console.log(this.state);
		var avatarClasses = {
			user_avatar: true
		};
		var avatarInlineCSS = {};

		if (this.state.selectedUser && this.state.selectedUser.avatar) {
			avatarClasses.user_selected 	= true;
			avatarInlineCSS.backgroundImage = 'url(images/avatars/' + this.state.selectedUser.avatar + '.jpg)';
		}

		var totalPrice, commisionPrice, proceedButton;

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

			proceedButton = (<button type="submit" onClick={this.proceed}>Proceed</button>);
		}

        return (
            <div className="page page_product">
                <div className={cx(avatarClasses)} style={avatarInlineCSS}></div>
                <div>
                	<p>Items for {this.state.selectedUser.name}</p>
                </div>
                <div className="item_list">
                	{selectedProducts}
                </div>
                <div className="right">
                	<div>Total Price: &pound;{totalPrice}</div>
                	<div>Commision: &pound;{commisionPrice}</div>
                </div>
                <div className="right">
                	<p><a href="#" onClick={this.viewEmail}>View client email</a></p>
                </div>
                <div>
                	<p className="center">Click below to send {this.state.selectedUser.name} your recommendations</p>
                	<button onClick={this.sendEmail}>Send Client Email</button>
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
    	this.getFlux().actions.page.update({
    		page: 'success'
    	});
    }

});