/** @jsx React.DOM */

'use strict';

var React = require('react'),
	Fluxxor = require('fluxxor'),
	FluxMixin = Fluxxor.FluxMixin(React),
    StoreWatchMixin = Fluxxor.StoreWatchMixin;

var cx = require('classnames');

var CONSTANTS = require('../constants/constants');

var Avatar				= require('./avatar.jsx');
var ChildProductItem	= require('./childProductItem.jsx');

module.exports = React.createClass({
	displayName: 'product.jsx',
	mixins: [FluxMixin, StoreWatchMixin('ClientStore', 'ProductStore')],
	getInitialState: function() {
		return {};
	},
	getStateFromFlux: function() {
		var flux = this.getFlux();
		var productStore = flux.store('ProductStore').getState();

		return {
			selectedUser: flux.store('ClientStore').getState().client,
			loading: productStore.loading,
			masterProduct: productStore.selectedMasterProduct,
			childProducts: productStore.childProducts
		};
	},
	componentDidMount: function() {
		window.scrollTo(0,0);
	},
    render: function() {
		var childProducts, loading;

		if (this.state.loading === false) {
			if (this.state.childProducts.length > 0) {
				var childProductsArray = [];

	    		this.state.childProducts.forEach(function(product) {
	    			childProductsArray.push(
    					(<ChildProductItem key={ product.id } product={ product } />)
	    			);
	    		}.bind(this));

				childProducts = (
					<ul className="item_list product_results">
						{ childProductsArray }
					</ul>
				);
	    	} else {
	    		loading = (
	    			<div>
	    				No results found
	    			</div>
	    		);
	    	}
	    }

    	if (this.state.loading === true) {
    		loading = (
    			<div>
    				Loading...
    			</div>
    		);
    	}

    	var masterProduct = this.state.masterProduct;

    	return (
    		<div>
    			<div>
    				<h2>{ masterProduct.name }</h2>
    				<p>{ masterProduct.description }</p>
    			</div>
    			{ loading }
    			{ childProducts }
    		</div>
    	);
    }

});