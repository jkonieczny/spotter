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
	displayName: 'email.jsx',
	mixins: [FluxMixin, StoreWatchMixin('UserStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
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
            <div className="page page_success">
                <div className={cx(avatarClasses)} style={avatarInlineCSS}></div>
                <div>
                	<p>Email</p>
                </div>
                <div>
                	{selectedProducts}
                </div>
            </div>
        );
    },
    viewEmail: function(e) {
    	e.preventDefault();
    	console.log('view email');
    },
    sendEmail: function(e) {
    	e.preventDefault();
    	console.log('send email');
    }

});