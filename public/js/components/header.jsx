/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
	StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

module.exports = React.createClass({
	mixins: [FluxMixin, StoreWatchMixin('PageStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux			= this.getFlux();
		var state			= flux.store('PageStore').getState();
		var productStore	= flux.store('ProductStore').getState();

		return {
			page:				state.currentPage,
			back:				(state.currentPage !== 'home' && state.currentPage !== 'signin'),
			selectedProducts:	productStore.selectedProducts,
			userNames:			state.userNames
		};
	},
	render: function() {
		var basket;

		if (this.state.selectedProducts.length > 0) {
			basket = (
				<div className="header_basket" onClick={ this.goToBasket }>
					<em>Basket</em> ({this.state.selectedProducts.length})
				</div>
			);
		}

		return (
			<header>
				<div className={cx( 'header_back', { 'hide' : (this.state.back === false) } )} onClick={this.goBack}>{ this.state.userNames[this.state.page] || 'Home' }</div>
				<h1 className="header_title">spotter</h1>
				{ basket }
			</header>
		);
	},
	goBack: function(e) {
		this.getFlux().actions.page.goBack();
	},
    goToBasket: function(e) {
        this.getFlux().actions.page.update({
            page: 'confirmation'
        });
    }

});