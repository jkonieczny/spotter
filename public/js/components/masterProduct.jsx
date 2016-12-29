/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var CONSTANTS = require('../constants/constants');

var MasterProductItem	= require('./masterProductItem.jsx');

function debounce(func, wait, immediate) {
    var timeout;
    return function() {
        var context = this, args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        }, wait);
        if (immediate && !timeout) func.apply(context, args);
    };
};

module.exports = React.createClass({
	displayName: 'masterProduct.jsx',
	mixins: [FluxMixin, StoreWatchMixin('ClientStore', 'ProductStore')],
	getStateFromFlux: function() {
		var flux = this.getFlux();
		var productStore = flux.store('ProductStore').getState();

		return {
			loading: productStore.loading,
			selectedUser: flux.store('ClientStore').getState().client,
			masterProducts: productStore.masterProducts,
			value: productStore.value
		};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
		console.log('state', this.state);
		var masterProducts, loading;

		if (this.state.masterProducts.length > 0 && this.state.loading === false) {
			var masterProductsArray = [];

    		this.state.masterProducts.forEach(function(mp) {
    			masterProductsArray.push(
    				(<MasterProductItem key={ mp.id } masterProduct={ mp } value={ this.state.value } />)
    			);
    		}.bind(this));

			masterProducts = (
				<ul className="item_list product_results">
					{ masterProductsArray }
				</ul>
			);
    	}

    	if (this.state.loading === true) {
    		loading = (
    			<div>
    				Loading...
    			</div>
    		);
    	} 

    	return (
    		<div className="page page_master_product">
    			<div className="product_search">
    				<input type="text" placeholder="E.g. GF-1, Creatine, Vit C…" onChange={ this.productInput } value={ this.state.value } />
    			</div>
    			{ loading }
    			{ masterProducts }
    		</div>
    	);
    },
    productInput: function(e) {
    	this.getProducts(e.currentTarget.value);

    	this.getFlux().actions.masterProducts.value({
    		value: e.currentTarget.value
    	});
    },
    getProducts: debounce(function(value) {
    	this.getFlux().actions.masterProducts.search({
    		value: value
    	});
    }, 250)

});